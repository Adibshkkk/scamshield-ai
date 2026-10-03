import { describe, it, expect } from 'vitest';
import { calculateOverallMetrics } from '../engine/scoreCalculator';
import { ScenarioAttempt } from '../types/scenarios';

describe('Scoring Engine and Awareness Metrics', () => {
  it('should return empty baseline when zero scenarios are completed', () => {
    const metrics = calculateOverallMetrics([]);

    expect(metrics.totalScenariosCompleted).toBe(0);
    expect(metrics.overallScore).toBe(0);
    expect(metrics.isProvisional).toBe(false);
    expect(metrics.frequentlyMissedIndicators).toHaveLength(0);
  });

  it('should mark score as provisional when exactly 1 scenario is completed', () => {
    const singleAttempt: ScenarioAttempt = {
      id: 'att-1',
      sessionId: 'sess-1',
      scenarioId: 'upi-refund-trap',
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      completionStatus: 'completed',
      totalScore: 200,
      maxScore: 200,
      accuracy: 100,
      safeDecisionsCount: 2,
      riskyDecisionsCount: 0,
      partialDecisionsCount: 0,
      caughtIndicatorIds: ['unexpected_payment_request', 'safe_reporting_recovery'],
      missedIndicatorIds: [],
      recovered: false,
      decisions: [
        {
          id: 'dec-1',
          scenarioId: 'upi-refund-trap',
          nodeId: 'upi_node_1',
          choiceId: 'c1_check_statement',
          sequenceNumber: 1,
          timestamp: new Date().toISOString(),
          safetyLevel: 'safe',
          pointsEarned: 100,
          maxPoints: 100,
          caughtIndicators: ['unexpected_payment_request'],
          missedIndicators: [],
          explanationKey: '',
          saferAlternativeKey: '',
          consequenceKey: '',
        },
      ],
    };

    const metrics = calculateOverallMetrics([singleAttempt]);

    expect(metrics.totalScenariosCompleted).toBe(1);
    expect(metrics.overallScore).toBe(100);
    expect(metrics.isProvisional).toBe(true);
    expect(metrics.overallAccuracy).toBe(100);
  });

  it('should remove provisional flag and compute average when multiple unique scenarios completed', () => {
    const attempt1: ScenarioAttempt = {
      id: 'att-1',
      sessionId: 'sess-1',
      scenarioId: 'upi-refund-trap',
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      completionStatus: 'completed',
      totalScore: 100,
      maxScore: 100,
      accuracy: 100,
      safeDecisionsCount: 1,
      riskyDecisionsCount: 0,
      partialDecisionsCount: 0,
      caughtIndicatorIds: ['unexpected_payment_request'],
      missedIndicatorIds: [],
      recovered: false,
      decisions: [],
    };

    const attempt2: ScenarioAttempt = {
      id: 'att-2',
      sessionId: 'sess-1',
      scenarioId: 'urgent-bank-kyc',
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      completionStatus: 'completed',
      totalScore: 80,
      maxScore: 100,
      accuracy: 80,
      safeDecisionsCount: 1,
      riskyDecisionsCount: 0,
      partialDecisionsCount: 0,
      caughtIndicatorIds: ['suspicious_links'],
      missedIndicatorIds: [],
      recovered: false,
      decisions: [],
    };

    const metrics = calculateOverallMetrics([attempt1, attempt2]);

    expect(metrics.totalScenariosCompleted).toBe(2);
    expect(metrics.overallScore).toBe(90); // (100 + 80) / 2
    expect(metrics.isProvisional).toBe(false);
  });
});
