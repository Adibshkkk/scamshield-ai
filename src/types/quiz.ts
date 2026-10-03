import { IndicatorId } from './indicators';

export interface QuizQuestion {
  id: string;
  category: string;
  questionKey: string;
  optionsKeys: string[];
  correctAnswerIndex: number;
  explanationKey: string;
  relatedIndicatorId: IndicatorId;
}

export interface QuizAttempt {
  id: string;
  sessionId: string;
  completedAt: string;
  totalQuestions: number;
  correctAnswersCount: number;
  scorePercentage: number;
}

export interface LearningTopic {
  id: string;
  category: string;
  titleKey: string;
  summaryKey: string;
  warningSignsKeys: string[];
  safeActionsKeys: string[];
  goldenRuleKey: string;
  relatedScenarioId: string;
}
