import { describe, it, expect, beforeEach } from 'vitest';
import { StorageService } from '../services/storageService';
import { SCENARIOS_BY_ID } from '../data/scenarios';
import {
  initScenarioEngine,
  submitDecision,
  advanceToNextNode,
} from '../engine/scenarioEngine';
import { calculateOverallMetrics } from '../engine/scoreCalculator';
import { generatePersonalizedTips } from '../engine/personalizationEngine';
import { en } from '../i18n/translations/en';
import { hi } from '../i18n/translations/hi';
import { mr } from '../i18n/translations/mr';

describe('End-to-End User Simulation and Multilingual Journey', () => {
  beforeEach(() => {
    StorageService.clearAllData();
  });

  it('completes the entire UPI scenario journey, evaluates decisions, tests recovery, persists results, and localizes in Hindi & Marathi', () => {
    // 1. User starts simulation in Hindi
    StorageService.updateLanguagePreference('hi');
    const profile = StorageService.getUserProfile();
    expect(profile.preferredLanguage).toBe('hi');

    // 2. Load UPI Refund scenario
    const scenario = SCENARIOS_BY_ID['upi-refund-trap'];
    expect(scenario).toBeDefined();

    // Verify initial localized message exists in Hindi and Marathi
    const initialMessageKey = scenario.nodes[scenario.startNodeId].messageKey;
    expect(hi[initialMessageKey as keyof typeof hi]).toContain('₹३,५००');
    expect(mr[initialMessageKey as keyof typeof mr]).toContain('₹३,५००');
    expect(en[initialMessageKey as keyof typeof en]).toContain('₹3,500');

    let state = initScenarioEngine(scenario, profile.sessionId);
    expect(state.currentNodeId).toBe('upi_node_1');

    // 3. User makes an initial risky decision (c1_approve_pin)
    state = submitDecision(state, 'c1_approve_pin');
    expect(state.hasSubmittedCurrentDecision).toBe(true);

    const firstDecision = state.lastDecisionResult!;
    expect(firstDecision.safetyLevel).toBe('risky');
    expect(firstDecision.pointsEarned).toBe(0);
    expect(firstDecision.missedIndicators).toContain('requests_for_otp_pin');
    expect(firstDecision.missedIndicators).toContain('unexpected_payment_request');

    // 4. Advance to next dynamic branch -> Escalation node
    state = advanceToNextNode(state);
    expect(state.currentNodeId).toBe('upi_node_escalate');
    expect(state.isCompleted).toBe(false);

    // 5. User executes the RECOVERY decision (c2_refuse_recover)
    state = submitDecision(state, 'c2_refuse_recover');
    const secondDecision = state.lastDecisionResult!;
    expect(secondDecision.safetyLevel).toBe('safe');
    expect(secondDecision.isRecoveryChoice).toBe(true);
    expect(secondDecision.pointsEarned).toBe(90);
    expect(secondDecision.caughtIndicators).toContain('safe_reporting_recovery');
    expect(state.attempt.recovered).toBe(true);

    // 6. Complete scenario
    state = advanceToNextNode(state);
    expect(state.isCompleted).toBe(true);
    expect(state.currentNodeId).toBe('upi_node_recovered_ending');
    expect(state.attempt.completionStatus).toBe('completed');
    expect(state.attempt.endingType).toBe('successful_recovery');

    // Accuracy: (0 + 90) / 200 = 45%
    expect(state.attempt.accuracy).toBe(45);

    // 7. Persist scenario attempt
    StorageService.saveScenarioAttempt(state.attempt);

    // 8. Verify persistence survives
    const savedAttempts = StorageService.getScenarioAttempts();
    expect(savedAttempts).toHaveLength(1);
    expect(savedAttempts[0].id).toBe(state.attempt.id);
    expect(savedAttempts[0].recovered).toBe(true);

    // 9. Calculate overall awareness metrics
    const metrics = calculateOverallMetrics(savedAttempts);
    expect(metrics.totalScenariosCompleted).toBe(1);
    expect(metrics.isProvisional).toBe(true);
    expect(metrics.overallScore).toBe(45);
    expect(metrics.frequentlyMissedIndicators.length).toBeGreaterThan(0);
    expect(metrics.recoverySuccessRate).toBe(100);

    // 10. Generate personalized tips
    const tips = generatePersonalizedTips(metrics, savedAttempts);
    expect(tips.length).toBeGreaterThan(0);
    // User missed OTP/PIN indicator, so personalized tip must address OTP/PIN
    const pinTip = tips.find((t) => t.relatedIndicatorId === 'requests_for_otp_pin');
    expect(pinTip).toBeDefined();

    // Verify tip translations exist in Hindi and Marathi
    expect(hi[pinTip!.titleKey as keyof typeof hi]).toBeDefined();
    expect(mr[pinTip!.titleKey as keyof typeof mr]).toBeDefined();

    // 11. Switch to Marathi
    StorageService.updateLanguagePreference('mr');
    const updatedProfile = StorageService.getUserProfile();
    expect(updatedProfile.preferredLanguage).toBe('mr');

    // Progress remains intact after language change
    const attemptsAfterLangChange = StorageService.getScenarioAttempts();
    expect(attemptsAfterLangChange).toHaveLength(1);
    expect(attemptsAfterLangChange[0].accuracy).toBe(45);
  });
});
