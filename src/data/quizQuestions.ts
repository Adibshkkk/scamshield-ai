import { QuizQuestion } from '../types/quiz';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'quiz-q1',
    category: 'upi_safety',
    questionKey: 'quiz.q1.question',
    optionsKeys: [
      'quiz.q1.opt_a',
      'quiz.q1.opt_b',
      'quiz.q1.opt_c',
      'quiz.q1.opt_d',
    ],
    correctAnswerIndex: 2, // Entering UPI PIN always debits money
    explanationKey: 'quiz.q1.explanation',
    relatedIndicatorId: 'requests_for_otp_pin',
  },
  {
    id: 'quiz-q2',
    category: 'phishing',
    questionKey: 'quiz.q2.question',
    optionsKeys: [
      'quiz.q2.opt_a',
      'quiz.q2.opt_b',
      'quiz.q2.opt_c',
      'quiz.q2.opt_d',
    ],
    correctAnswerIndex: 1, // Look at domain name in URL and sender ID
    explanationKey: 'quiz.q2.explanation',
    relatedIndicatorId: 'suspicious_links',
  },
  {
    id: 'quiz-q3',
    category: 'investment',
    questionKey: 'quiz.q3.question',
    optionsKeys: [
      'quiz.q3.opt_a',
      'quiz.q3.opt_b',
      'quiz.q3.opt_c',
      'quiz.q3.opt_d',
    ],
    correctAnswerIndex: 0, // No genuine market investment guarantees high returns without risk
    explanationKey: 'quiz.q3.explanation',
    relatedIndicatorId: 'unrealistic_returns',
  },
  {
    id: 'quiz-q4',
    category: 'support_impersonation',
    questionKey: 'quiz.q4.question',
    optionsKeys: [
      'quiz.q4.opt_a',
      'quiz.q4.opt_b',
      'quiz.q4.opt_c',
      'quiz.q4.opt_d',
    ],
    correctAnswerIndex: 3, // Never install AnyDesk / QuickSupport on caller demand
    explanationKey: 'quiz.q4.explanation',
    relatedIndicatorId: 'remote_access_request',
  },
  {
    id: 'quiz-q5',
    category: 'upi_safety',
    questionKey: 'quiz.q5.question',
    optionsKeys: [
      'quiz.q5.opt_a',
      'quiz.q5.opt_b',
      'quiz.q5.opt_c',
      'quiz.q5.opt_d',
    ],
    correctAnswerIndex: 1, // A QR code is scanned only to pay, never to receive
    explanationKey: 'quiz.q5.explanation',
    relatedIndicatorId: 'unexpected_payment_request',
  },
  {
    id: 'quiz-q6',
    category: 'kyc_fraud',
    questionKey: 'quiz.q6.question',
    optionsKeys: [
      'quiz.q6.opt_a',
      'quiz.q6.opt_b',
      'quiz.q6.opt_c',
      'quiz.q6.opt_d',
    ],
    correctAnswerIndex: 2, // Visit branch or use official netbanking portal
    explanationKey: 'quiz.q6.explanation',
    relatedIndicatorId: 'urgency_or_threats',
  },
  {
    id: 'quiz-q7',
    category: 'shopping_scam',
    questionKey: 'quiz.q7.question',
    optionsKeys: [
      'quiz.q7.opt_a',
      'quiz.q7.opt_b',
      'quiz.q7.opt_c',
      'quiz.q7.opt_d',
    ],
    correctAnswerIndex: 0, // Demanding upfront payment to personal QR while offering unrealistic 90% discount
    explanationKey: 'quiz.q7.explanation',
    relatedIndicatorId: 'unusual_payment_methods',
  },
  {
    id: 'quiz-q8',
    category: 'safe_reporting',
    questionKey: 'quiz.q8.question',
    optionsKeys: [
      'quiz.q8.opt_a',
      'quiz.q8.opt_b',
      'quiz.q8.opt_c',
      'quiz.q8.opt_d',
    ],
    correctAnswerIndex: 1, // Call national helpline 1930 and report to cybercrime.gov.in immediately
    explanationKey: 'quiz.q8.explanation',
    relatedIndicatorId: 'safe_reporting_recovery',
  },
  {
    id: 'quiz-q9',
    category: 'credential_safety',
    questionKey: 'quiz.q9.question',
    optionsKeys: [
      'quiz.q9.opt_a',
      'quiz.q9.opt_b',
      'quiz.q9.opt_c',
      'quiz.q9.opt_d',
    ],
    correctAnswerIndex: 3, // Bank staff never ask for OTP, CVV, or NetBanking password
    explanationKey: 'quiz.q9.explanation',
    relatedIndicatorId: 'impersonation',
  },
  {
    id: 'quiz-q10',
    category: 'safe_reporting',
    questionKey: 'quiz.q10.question',
    optionsKeys: [
      'quiz.q10.opt_a',
      'quiz.q10.opt_b',
      'quiz.q10.opt_c',
      'quiz.q10.opt_d',
    ],
    correctAnswerIndex: 2, // The Golden Hour (first 2-3 hours) is critical to freeze money before cash-out
    explanationKey: 'quiz.q10.explanation',
    relatedIndicatorId: 'safe_reporting_recovery',
  },
];
