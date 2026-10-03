import { describe, it, expect } from 'vitest';
import { evaluateDecision } from '../engine/decisionEvaluator';
import { SCENARIOS_BY_ID } from '../data/scenarios';

describe('Decision Evaluator', () => {
  it('should correctly evaluate safe choices with indicators and points', () => {
    const scenario = SCENARIOS_BY_ID['urgent-bank-kyc'];
    const node = scenario.nodes['kyc_node_1'];
    const choice = node.choices.find((c) => c.id === 'c1_inspect_sms')!;

    const decision = evaluateDecision(scenario.id, node, choice, 1);

    expect(decision.safetyLevel).toBe('safe');
    expect(decision.pointsEarned).toBe(100);
    expect(decision.caughtIndicators).toContain('suspicious_links');
    expect(decision.caughtIndicators).toContain('urgency_or_threats');
    expect(decision.missedIndicators).toHaveLength(0);
  });

  it('should correctly evaluate risky choices and track missed indicators without double counting', () => {
    const scenario = SCENARIOS_BY_ID['urgent-bank-kyc'];
    const node = scenario.nodes['kyc_node_1'];
    const choice = node.choices.find((c) => c.id === 'c1_click_link')!;

    const decision = evaluateDecision(scenario.id, node, choice, 1);

    expect(decision.safetyLevel).toBe('risky');
    expect(decision.pointsEarned).toBe(0);
    expect(decision.caughtIndicators).toHaveLength(0);
    expect(decision.missedIndicators).toContain('suspicious_links');
    expect(decision.missedIndicators).toContain('urgency_or_threats');

    // Ensure deduplication
    const uniqueMissed = new Set(decision.missedIndicators);
    expect(uniqueMissed.size).toBe(decision.missedIndicators.length);
  });
});
