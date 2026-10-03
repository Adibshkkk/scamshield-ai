import { DecisionEvaluation, DecisionRecord, ScenarioChoice, ScenarioNode } from '../types/scenarios';

export function evaluateDecision(
  scenarioId: string,
  node: ScenarioNode,
  choice: ScenarioChoice,
  sequenceNumber: number
): DecisionRecord {
  const evaluation: DecisionEvaluation = choice.decisionEvaluation;

  // Deduplicate indicator lists
  const caughtSet = new Set(evaluation.caughtIndicatorIds);
  const missedSet = new Set(evaluation.missedIndicatorIds);

  return {
    id: `decision-${scenarioId}-${node.id}-${choice.id}-${Date.now()}`,
    scenarioId,
    nodeId: node.id,
    choiceId: choice.id,
    sequenceNumber,
    timestamp: new Date().toISOString(),
    safetyLevel: evaluation.safetyLevel,
    pointsEarned: Math.max(0, Math.min(evaluation.points, evaluation.maxPoints)),
    maxPoints: evaluation.maxPoints || 100,
    caughtIndicators: Array.from(caughtSet),
    missedIndicators: Array.from(missedSet),
    explanationKey: evaluation.explanationKey,
    saferAlternativeKey: evaluation.saferAlternativeKey,
    consequenceKey: choice.consequenceKey,
    isRecoveryChoice: evaluation.isRecoveryChoice || false,
  };
}
