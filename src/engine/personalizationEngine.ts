import { IndicatorId } from '../types/indicators';
import { ScenarioAttempt } from '../types/scenarios';
import { PersonalizedTip, UserAwarenessMetrics } from '../types/user';

interface TipTemplate {
  indicatorId: IndicatorId;
  titleKey: string;
  shortExplanationKey: string;
  whyRecommendedKey: string;
  recommendedPracticeKey: string;
  practiceScenarioId: string;
}

const TIP_TEMPLATES: Record<IndicatorId, TipTemplate> = {
  requests_for_otp_pin: {
    indicatorId: 'requests_for_otp_pin',
    titleKey: 'tip.otp_pin.title',
    shortExplanationKey: 'tip.otp_pin.desc',
    whyRecommendedKey: 'tip.otp_pin.reason',
    recommendedPracticeKey: 'tip.otp_pin.action',
    practiceScenarioId: 'upi-refund-trap',
  },
  suspicious_links: {
    indicatorId: 'suspicious_links',
    titleKey: 'tip.links.title',
    shortExplanationKey: 'tip.links.desc',
    whyRecommendedKey: 'tip.links.reason',
    recommendedPracticeKey: 'tip.links.action',
    practiceScenarioId: 'urgent-bank-kyc',
  },
  unexpected_payment_request: {
    indicatorId: 'unexpected_payment_request',
    titleKey: 'tip.upi_collect.title',
    shortExplanationKey: 'tip.upi_collect.desc',
    whyRecommendedKey: 'tip.upi_collect.reason',
    recommendedPracticeKey: 'tip.upi_collect.action',
    practiceScenarioId: 'upi-refund-trap',
  },
  unrealistic_returns: {
    indicatorId: 'unrealistic_returns',
    titleKey: 'tip.invest.title',
    shortExplanationKey: 'tip.invest.desc',
    whyRecommendedKey: 'tip.invest.reason',
    recommendedPracticeKey: 'tip.invest.action',
    practiceScenarioId: 'guaranteed-investment',
  },
  impersonation: {
    indicatorId: 'impersonation',
    titleKey: 'tip.impersonation.title',
    shortExplanationKey: 'tip.impersonation.desc',
    whyRecommendedKey: 'tip.impersonation.reason',
    recommendedPracticeKey: 'tip.impersonation.action',
    practiceScenarioId: 'fake-customer-support',
  },
  remote_access_request: {
    indicatorId: 'remote_access_request',
    titleKey: 'tip.remote_access.title',
    shortExplanationKey: 'tip.remote_access.desc',
    whyRecommendedKey: 'tip.remote_access.reason',
    recommendedPracticeKey: 'tip.remote_access.action',
    practiceScenarioId: 'fake-customer-support',
  },
  unusual_payment_methods: {
    indicatorId: 'unusual_payment_methods',
    titleKey: 'tip.payment_method.title',
    shortExplanationKey: 'tip.payment_method.desc',
    whyRecommendedKey: 'tip.payment_method.reason',
    recommendedPracticeKey: 'tip.payment_method.action',
    practiceScenarioId: 'fake-shopping-discount',
  },
  urgency_or_threats: {
    indicatorId: 'urgency_or_threats',
    titleKey: 'tip.urgency.title',
    shortExplanationKey: 'tip.urgency.desc',
    whyRecommendedKey: 'tip.urgency.reason',
    recommendedPracticeKey: 'tip.urgency.action',
    practiceScenarioId: 'urgent-bank-kyc',
  },
  independent_verification: {
    indicatorId: 'independent_verification',
    titleKey: 'tip.verify.title',
    shortExplanationKey: 'tip.verify.desc',
    whyRecommendedKey: 'tip.verify.reason',
    recommendedPracticeKey: 'tip.verify.action',
    practiceScenarioId: 'urgent-bank-kyc',
  },
  safe_reporting_recovery: {
    indicatorId: 'safe_reporting_recovery',
    titleKey: 'tip.reporting.title',
    shortExplanationKey: 'tip.reporting.desc',
    whyRecommendedKey: 'tip.reporting.reason',
    recommendedPracticeKey: 'tip.reporting.action',
    practiceScenarioId: 'upi-refund-trap',
  },
};

export function generatePersonalizedTips(
  metrics: UserAwarenessMetrics,
  _attempts: ScenarioAttempt[]
): PersonalizedTip[] {
  // If no scenarios completed yet
  if (metrics.totalScenariosCompleted === 0) {
    return [];
  }

  const tips: PersonalizedTip[] = [];

  // If user has missed indicators, generate prioritized tips based on frequency and severity
  if (metrics.frequentlyMissedIndicators.length > 0) {
    for (const item of metrics.frequentlyMissedIndicators) {
      const template = TIP_TEMPLATES[item.indicatorId];
      if (template) {
        // High severity indicators get boost
        const severityMultiplier =
          item.indicatorId === 'requests_for_otp_pin' ||
          item.indicatorId === 'remote_access_request' ||
          item.indicatorId === 'unexpected_payment_request'
            ? 3
            : 2;

        const priorityScore = item.count * severityMultiplier;

        tips.push({
          id: `tip-${item.indicatorId}-${priorityScore}`,
          titleKey: template.titleKey,
          shortExplanationKey: template.shortExplanationKey,
          whyRecommendedKey: template.whyRecommendedKey,
          relatedIndicatorId: item.indicatorId,
          recommendedPracticeKey: template.recommendedPracticeKey,
          scenarioIdToPractice: template.practiceScenarioId,
          priorityScore,
        });
      }
    }
  }

  // If user has high performance (>85% score and few missed indicators)
  if (metrics.overallScore >= 85) {
    tips.push({
      id: 'tip-high-performance-mastery',
      titleKey: 'tip.mastery.title',
      shortExplanationKey: 'tip.mastery.desc',
      whyRecommendedKey: 'tip.mastery.reason',
      relatedIndicatorId: 'independent_verification',
      recommendedPracticeKey: 'tip.mastery.action',
      scenarioIdToPractice: 'fake-shopping-discount',
      priorityScore: 50,
    });
  }

  // Sort by priorityScore descending and limit to top 4 tips
  tips.sort((a, b) => b.priorityScore - a.priorityScore);

  return tips.slice(0, 4);
}
