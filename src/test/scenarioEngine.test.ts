import { describe, it, expect } from 'vitest';
import { ALL_SCENARIOS, SCENARIOS_BY_ID } from '../data/scenarios';
import {
  initScenarioEngine,
  submitDecision,
  advanceToNextNode,
  validateScenarioGraph,
} from '../engine/scenarioEngine';

describe('Scenario Engine and Graph Integrity', () => {
  it('should validate all 5 scenarios with zero graph reference errors', () => {
    expect(ALL_SCENARIOS.length).toBe(5);

    for (const scenario of ALL_SCENARIOS) {
      const validation = validateScenarioGraph(scenario);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    }
  });

  it('should catch invalid start nodes or missing ending nodes', () => {
    const invalidScenario = {
      ...ALL_SCENARIOS[0],
      startNodeId: 'non-existent-start-node',
    };
    const validation = validateScenarioGraph(invalidScenario);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some((e) => e.includes('does not exist'))).toBe(true);
  });

  it('should initialize scenario engine with clean initial state', () => {
    const scenario = SCENARIOS_BY_ID['upi-refund-trap'];
    const state = initScenarioEngine(scenario, 'test-session-123');

    expect(state.currentNodeId).toBe(scenario.startNodeId);
    expect(state.isCompleted).toBe(false);
    expect(state.attempt.decisions).toHaveLength(0);
    expect(state.attempt.totalScore).toBe(0);
    expect(state.hasSubmittedCurrentDecision).toBe(false);
  });

  it('should evaluate choice, update score, and prevent duplicate submissions', () => {
    const scenario = SCENARIOS_BY_ID['upi-refund-trap'];
    let state = initScenarioEngine(scenario, 'test-session-123');

    // Submit safe choice: c1_check_statement
    state = submitDecision(state, 'c1_check_statement');

    expect(state.hasSubmittedCurrentDecision).toBe(true);
    expect(state.attempt.decisions).toHaveLength(1);
    expect(state.attempt.decisions[0].safetyLevel).toBe('safe');
    expect(state.attempt.decisions[0].pointsEarned).toBe(100);
    expect(state.attempt.totalScore).toBe(100);

    // Duplicate submission must throw error
    expect(() => submitDecision(state, 'c1_check_statement')).toThrow();
  });

  it('should support dynamic conditional branching based on choices', () => {
    const scenario = SCENARIOS_BY_ID['upi-refund-trap'];

    // Branch A: Safe choice -> investigates
    let stateA = initScenarioEngine(scenario, 'session-a');
    stateA = submitDecision(stateA, 'c1_check_statement');
    stateA = advanceToNextNode(stateA);
    expect(stateA.currentNodeId).toBe('upi_node_investigate');

    // Branch B: Risky choice -> escalates with fraud collect request
    let stateB = initScenarioEngine(scenario, 'session-b');
    stateB = submitDecision(stateB, 'c1_approve_pin');
    stateB = advanceToNextNode(stateB);
    expect(stateB.currentNodeId).toBe('upi_node_escalate');
  });

  it('should support recovery path after an unsafe initial decision', () => {
    const scenario = SCENARIOS_BY_ID['upi-refund-trap'];
    let state = initScenarioEngine(scenario, 'session-recover');

    // 1. Initial risky choice
    state = submitDecision(state, 'c1_approve_pin');
    expect(state.attempt.decisions[0].pointsEarned).toBe(0);
    expect(state.attempt.decisions[0].safetyLevel).toBe('risky');
    state = advanceToNextNode(state);

    // 2. Recovery decision: refuse and report
    state = submitDecision(state, 'c2_refuse_recover');
    expect(state.attempt.decisions[1].isRecoveryChoice).toBe(true);
    expect(state.attempt.decisions[1].pointsEarned).toBe(90);
    expect(state.attempt.recovered).toBe(true);

    state = advanceToNextNode(state);
    expect(state.isCompleted).toBe(true);
    expect(state.attempt.endingType).toBe('successful_recovery');
  });

  it('should reject invalid choice IDs', () => {
    const scenario = SCENARIOS_BY_ID['upi-refund-trap'];
    const state = initScenarioEngine(scenario, 'session-123');

    expect(() => submitDecision(state, 'invalid-choice-id')).toThrow();
  });
});
