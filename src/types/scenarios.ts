import { IndicatorId } from './indicators';

export type SafetyLevel = 'safe' | 'partially_safe' | 'risky';

export type ScenarioCategory =
  | 'upi_fraud'
  | 'phishing_sms'
  | 'investment_fraud'
  | 'support_impersonation'
  | 'shopping_scam';

export type ScenarioDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface VisualContext {
  type: 'upi_collect' | 'sms' | 'chat' | 'fake_website' | 'call' | 'qr_code' | 'investment_group';
  senderId?: string;
  senderName?: string;
  amount?: string;
  vpa?: string;
  url?: string;
  badge?: string;
  meta?: Record<string, string>;
}

export interface DecisionEvaluation {
  safetyLevel: SafetyLevel;
  points: number; // e.g., 0 - 100
  maxPoints: number; // usually 100
  caughtIndicatorIds: IndicatorId[];
  missedIndicatorIds: IndicatorId[];
  explanationKey: string;
  saferAlternativeKey: string;
  isRecoveryChoice?: boolean;
}

export interface ScenarioChoice {
  id: string;
  textKey: string;
  nextNodeId: string;
  decisionEvaluation: DecisionEvaluation;
  consequenceKey: string;
}

export interface ScenarioNode {
  id: string;
  stepNumber: number;
  scenarioId: string;
  sender: {
    name: string;
    roleKey: string;
    handle?: string;
    isVerified?: boolean;
  };
  messageKey: string;
  visualContext?: VisualContext;
  choices: ScenarioChoice[];
  isEnding?: boolean;
  endingType?: 'safe_prevention' | 'compromised' | 'successful_recovery' | 'partial_loss';
  endingTitleKey?: string;
  endingSummaryKey?: string;
}

export interface Scenario {
  id: string;
  titleKey: string;
  category: ScenarioCategory;
  difficulty: ScenarioDifficulty;
  estimatedMinutes: number;
  descriptionKey: string;
  learningObjectiveKey: string;
  startNodeId: string;
  indicatorDefinitions: IndicatorId[];
  nodes: Record<string, ScenarioNode>;
}

export interface DecisionRecord {
  id: string;
  scenarioId: string;
  nodeId: string;
  choiceId: string;
  sequenceNumber: number;
  timestamp: string;
  safetyLevel: SafetyLevel;
  pointsEarned: number;
  maxPoints: number;
  caughtIndicators: IndicatorId[];
  missedIndicators: IndicatorId[];
  explanationKey: string;
  saferAlternativeKey: string;
  consequenceKey: string;
  isRecoveryChoice?: boolean;
}

export interface ScenarioAttempt {
  id: string;
  sessionId: string;
  scenarioId: string;
  startedAt: string;
  completedAt?: string;
  decisions: DecisionRecord[];
  totalScore: number;
  maxScore: number;
  accuracy: number; // 0 - 100
  completionStatus: 'in_progress' | 'completed' | 'abandoned';
  endingType?: 'safe_prevention' | 'compromised' | 'successful_recovery' | 'partial_loss';
  safeDecisionsCount: number;
  riskyDecisionsCount: number;
  partialDecisionsCount: number;
  caughtIndicatorIds: IndicatorId[];
  missedIndicatorIds: IndicatorId[];
  recovered: boolean;
}
