import { describe, it, expect } from 'vitest';
import { generatePersonalizedTips } from '../engine/personalizationEngine';
import { UserAwarenessMetrics } from '../types/user';

describe('Personalization Engine', () => {
  it('should generate targeted tips when user misses specific indicators like suspicious_links', () => {
    const metrics: UserAwarenessMetrics = {
      overallScore: 60,
      isProvisional: false,
      totalScenariosCompleted: 2,
      totalDecisionsEvaluated: 4,
      overallAccuracy: 60,
      safeDecisionsRatio: 50,
      frequentlyMissedIndicators: [
        { indicatorId: 'suspicious_links', count: 2 },
        { indicatorId: 'requests_for_otp_pin', count: 1 },
      ],
      consistentlyCaughtIndicators: [],
      recoverySuccessRate: 100,
      recentAttempts: [],
    };

    const tips = generatePersonalizedTips(metrics, []);

    expect(tips.length).toBeGreaterThan(0);
    const hasLinkTip = tips.some((t) => t.relatedIndicatorId === 'suspicious_links');
    expect(hasLinkTip).toBe(true);

    const hasOtpTip = tips.some((t) => t.relatedIndicatorId === 'requests_for_otp_pin');
    expect(hasOtpTip).toBe(true);
  });

  it('should reward high performers with mastery celebration and advanced drills', () => {
    const metrics: UserAwarenessMetrics = {
      overallScore: 95,
      isProvisional: false,
      totalScenariosCompleted: 3,
      totalDecisionsEvaluated: 6,
      overallAccuracy: 95,
      safeDecisionsRatio: 100,
      frequentlyMissedIndicators: [],
      consistentlyCaughtIndicators: [
        { indicatorId: 'unexpected_payment_request', count: 2 },
      ],
      recoverySuccessRate: 100,
      recentAttempts: [],
    };

    const tips = generatePersonalizedTips(metrics, []);

    expect(tips.some((t) => t.id === 'tip-high-performance-mastery')).toBe(true);
  });
});
