import { IndicatorId } from './indicators';
import { ScenarioAttempt } from './scenarios';

export type SupportedLanguage = 'en' | 'hi' | 'mr';

export interface UserProfile {
  sessionId: string;
  preferredLanguage: SupportedLanguage;
  createdAt: string;
  updatedAt: string;
}

export interface PersonalizedTip {
  id: string;
  titleKey: string;
  shortExplanationKey: string;
  whyRecommendedKey: string;
  relatedIndicatorId: IndicatorId;
  recommendedPracticeKey: string;
  scenarioIdToPractice?: string;
  priorityScore: number;
}

export interface UserAwarenessMetrics {
  overallScore: number; // 0 - 100
  isProvisional: boolean;
  totalScenariosCompleted: number;
  totalDecisionsEvaluated: number;
  overallAccuracy: number; // 0 - 100
  safeDecisionsRatio: number;
  frequentlyMissedIndicators: { indicatorId: IndicatorId; count: number }[];
  consistentlyCaughtIndicators: { indicatorId: IndicatorId; count: number }[];
  recoverySuccessRate: number;
  recentAttempts: ScenarioAttempt[];
}
