import { LearningTopic } from '../types/quiz';

export const LEARNING_TOPICS: LearningTopic[] = [
  {
    id: 'learn-upi-safety',
    category: 'upi',
    titleKey: 'learn.upi.title',
    summaryKey: 'learn.upi.summary',
    warningSignsKeys: [
      'learn.upi.sign1',
      'learn.upi.sign2',
      'learn.upi.sign3',
    ],
    safeActionsKeys: [
      'learn.upi.action1',
      'learn.upi.action2',
      'learn.upi.action3',
    ],
    goldenRuleKey: 'learn.upi.golden_rule',
    relatedScenarioId: 'upi-refund-trap',
  },
  {
    id: 'learn-phishing-sms',
    category: 'phishing',
    titleKey: 'learn.phishing.title',
    summaryKey: 'learn.phishing.summary',
    warningSignsKeys: [
      'learn.phishing.sign1',
      'learn.phishing.sign2',
      'learn.phishing.sign3',
    ],
    safeActionsKeys: [
      'learn.phishing.action1',
      'learn.phishing.action2',
      'learn.phishing.action3',
    ],
    goldenRuleKey: 'learn.phishing.golden_rule',
    relatedScenarioId: 'urgent-bank-kyc',
  },
  {
    id: 'learn-investment-fraud',
    category: 'investment',
    titleKey: 'learn.investment.title',
    summaryKey: 'learn.investment.summary',
    warningSignsKeys: [
      'learn.investment.sign1',
      'learn.investment.sign2',
      'learn.investment.sign3',
    ],
    safeActionsKeys: [
      'learn.investment.action1',
      'learn.investment.action2',
      'learn.investment.action3',
    ],
    goldenRuleKey: 'learn.investment.golden_rule',
    relatedScenarioId: 'guaranteed-investment',
  },
  {
    id: 'learn-remote-support',
    category: 'impersonation',
    titleKey: 'learn.support.title',
    summaryKey: 'learn.support.summary',
    warningSignsKeys: [
      'learn.support.sign1',
      'learn.support.sign2',
      'learn.support.sign3',
    ],
    safeActionsKeys: [
      'learn.support.action1',
      'learn.support.action2',
      'learn.support.action3',
    ],
    goldenRuleKey: 'learn.support.golden_rule',
    relatedScenarioId: 'fake-customer-support',
  },
  {
    id: 'learn-online-shopping',
    category: 'shopping',
    titleKey: 'learn.shopping.title',
    summaryKey: 'learn.shopping.summary',
    warningSignsKeys: [
      'learn.shopping.sign1',
      'learn.shopping.sign2',
      'learn.shopping.sign3',
    ],
    safeActionsKeys: [
      'learn.shopping.action1',
      'learn.shopping.action2',
      'learn.shopping.action3',
    ],
    goldenRuleKey: 'learn.shopping.golden_rule',
    relatedScenarioId: 'fake-shopping-discount',
  },
  {
    id: 'learn-incident-recovery',
    category: 'reporting',
    titleKey: 'learn.recovery.title',
    summaryKey: 'learn.recovery.summary',
    warningSignsKeys: [
      'learn.recovery.sign1',
      'learn.recovery.sign2',
      'learn.recovery.sign3',
    ],
    safeActionsKeys: [
      'learn.recovery.action1',
      'learn.recovery.action2',
      'learn.recovery.action3',
    ],
    goldenRuleKey: 'learn.recovery.golden_rule',
    relatedScenarioId: 'urgent-bank-kyc',
  },
];
