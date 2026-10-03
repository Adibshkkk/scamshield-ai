import { Scenario, ScenarioAttempt, ScenarioChoice, ScenarioNode } from '../types/scenarios';
import { evaluateDecision } from './decisionEvaluator';

export interface GraphValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateScenarioGraph(scenario: Scenario): GraphValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!scenario.id) errors.push('Scenario ID is required.');
  if (!scenario.startNodeId) errors.push('Start node ID is required.');
  if (!scenario.nodes[scenario.startNodeId]) {
    errors.push(`Start node '${scenario.startNodeId}' does not exist in scenario '${scenario.id}'.`);
  }

  const visitedNodes = new Set<string>();
  const endingNodes: string[] = [];

  for (const [nodeId, node] of Object.entries(scenario.nodes)) {
    if (node.isEnding) {
      endingNodes.push(nodeId);
      if (node.choices && node.choices.length > 0) {
        warnings.push(`Ending node '${nodeId}' has choices defined, which will never be shown.`);
      }
    } else {
      if (!node.choices || node.choices.length === 0) {
        errors.push(`Non-ending node '${nodeId}' has no choices.`);
      } else {
        for (const choice of node.choices) {
          if (!scenario.nodes[choice.nextNodeId]) {
            errors.push(`Choice '${choice.id}' in node '${nodeId}' references non-existent node '${choice.nextNodeId}'.`);
          }
        }
      }
    }
  }

  if (endingNodes.length === 0) {
    errors.push(`Scenario '${scenario.id}' has no ending nodes defined.`);
  }

  // Check reachability from start node (BFS)
  const queue: string[] = [scenario.startNodeId];
  visitedNodes.add(scenario.startNodeId);

  while (queue.length > 0) {
    const current = queue.shift()!;
    const node = scenario.nodes[current];
    if (node && node.choices) {
      for (const choice of node.choices) {
        if (!visitedNodes.has(choice.nextNodeId) && scenario.nodes[choice.nextNodeId]) {
          visitedNodes.add(choice.nextNodeId);
          queue.push(choice.nextNodeId);
        }
      }
    }
  }

  for (const nodeId of Object.keys(scenario.nodes)) {
    if (!visitedNodes.has(nodeId)) {
      warnings.push(`Node '${nodeId}' is unreachable from start node '${scenario.startNodeId}'.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export interface ScenarioEngineState {
  scenario: Scenario;
  currentNodeId: string;
  currentNode: ScenarioNode;
  attempt: ScenarioAttempt;
  isCompleted: boolean;
  lastDecisionResult?: ReturnType<typeof evaluateDecision>;
  selectedChoiceId?: string;
  hasSubmittedCurrentDecision: boolean;
}

export function initScenarioEngine(scenario: Scenario, sessionId: string): ScenarioEngineState {
  const validation = validateScenarioGraph(scenario);
  if (!validation.isValid) {
    throw new Error(`Invalid scenario graph for ${scenario.id}: ${validation.errors.join(', ')}`);
  }

  const startNode = scenario.nodes[scenario.startNodeId];
  if (!startNode) {
    throw new Error(`Start node ${scenario.startNodeId} not found in scenario ${scenario.id}`);
  }

  const attempt: ScenarioAttempt = {
    id: `attempt-${scenario.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    sessionId,
    scenarioId: scenario.id,
    startedAt: new Date().toISOString(),
    decisions: [],
    totalScore: 0,
    maxScore: 0,
    accuracy: 0,
    completionStatus: 'in_progress',
    safeDecisionsCount: 0,
    riskyDecisionsCount: 0,
    partialDecisionsCount: 0,
    caughtIndicatorIds: [],
    missedIndicatorIds: [],
    recovered: false,
  };

  return {
    scenario,
    currentNodeId: scenario.startNodeId,
    currentNode: startNode,
    attempt,
    isCompleted: !!startNode.isEnding,
    hasSubmittedCurrentDecision: false,
  };
}

export function submitDecision(
  state: ScenarioEngineState,
  choiceId: string
): ScenarioEngineState {
  if (state.isCompleted) {
    throw new Error('Scenario is already completed.');
  }

  if (state.hasSubmittedCurrentDecision) {
    throw new Error('Decision for current node has already been submitted. Please proceed to the next step.');
  }

  const choice: ScenarioChoice | undefined = state.currentNode.choices.find((c) => c.id === choiceId);
  if (!choice) {
    throw new Error(`Choice '${choiceId}' is not valid for node '${state.currentNodeId}'.`);
  }

  const sequenceNumber = state.attempt.decisions.length + 1;
  const decisionRecord = evaluateDecision(state.scenario.id, state.currentNode, choice, sequenceNumber);

  const updatedDecisions = [...state.attempt.decisions, decisionRecord];

  // Aggregate metrics
  let totalScore = 0;
  let maxScore = 0;
  let safeCount = 0;
  let riskyCount = 0;
  let partialCount = 0;
  const caughtSet = new Set<string>();
  const missedSet = new Set<string>();
  let hasRecovered = false;

  for (const d of updatedDecisions) {
    totalScore += d.pointsEarned;
    maxScore += d.maxPoints;
    if (d.safetyLevel === 'safe') safeCount++;
    else if (d.safetyLevel === 'risky') riskyCount++;
    else partialCount++;

    if (d.isRecoveryChoice && d.safetyLevel === 'safe') {
      hasRecovered = true;
    }

    d.caughtIndicators.forEach((i) => caughtSet.add(i));
    d.missedIndicators.forEach((i) => missedSet.add(i));
  }

  const accuracy = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  const updatedAttempt: ScenarioAttempt = {
    ...state.attempt,
    decisions: updatedDecisions,
    totalScore,
    maxScore,
    accuracy,
    safeDecisionsCount: safeCount,
    riskyDecisionsCount: riskyCount,
    partialDecisionsCount: partialCount,
    caughtIndicatorIds: Array.from(caughtSet) as any[],
    missedIndicatorIds: Array.from(missedSet) as any[],
    recovered: hasRecovered,
  };

  return {
    ...state,
    attempt: updatedAttempt,
    lastDecisionResult: decisionRecord,
    selectedChoiceId: choiceId,
    hasSubmittedCurrentDecision: true,
  };
}

export function advanceToNextNode(state: ScenarioEngineState): ScenarioEngineState {
  if (!state.hasSubmittedCurrentDecision || !state.lastDecisionResult) {
    throw new Error('Cannot advance before submitting a decision.');
  }

  const choice = state.currentNode.choices.find((c) => c.id === state.selectedChoiceId);
  if (!choice) {
    throw new Error('Current selected choice not found.');
  }

  const nextNode = state.scenario.nodes[choice.nextNodeId];
  if (!nextNode) {
    throw new Error(`Next node '${choice.nextNodeId}' does not exist.`);
  }

  const isEnding = !!nextNode.isEnding;
  const updatedAttempt: ScenarioAttempt = {
    ...state.attempt,
    completionStatus: isEnding ? 'completed' : 'in_progress',
    completedAt: isEnding ? new Date().toISOString() : undefined,
    endingType: isEnding ? nextNode.endingType : undefined,
  };

  return {
    ...state,
    currentNodeId: nextNode.id,
    currentNode: nextNode,
    attempt: updatedAttempt,
    isCompleted: isEnding,
    selectedChoiceId: undefined,
    hasSubmittedCurrentDecision: false,
  };
}
