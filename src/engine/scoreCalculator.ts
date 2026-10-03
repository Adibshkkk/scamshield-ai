import { IndicatorId } from '../types/indicators';
import { ScenarioAttempt } from '../types/scenarios';
import { UserAwarenessMetrics } from '../types/user';

export function calculateOverallMetrics(attempts: ScenarioAttempt[]): UserAwarenessMetrics {
  const completedAttempts = attempts.filter((a) => a.completionStatus === 'completed');

  if (completedAttempts.length === 0) {
    return {
      overallScore: 0,
      isProvisional: false,
      totalScenariosCompleted: 0,
      totalDecisionsEvaluated: 0,
      overallAccuracy: 0,
      safeDecisionsRatio: 0,
      frequentlyMissedIndicators: [],
      consistentlyCaughtIndicators: [],
      recoverySuccessRate: 0,
      recentAttempts: [],
    };
  }

  // Group by scenarioId to calculate scenario-level mastery (use latest attempt for each scenario)
  const latestByScenario: Record<string, ScenarioAttempt> = {};
  for (const attempt of completedAttempts) {
    if (
      !latestByScenario[attempt.scenarioId] ||
      new Date(attempt.startedAt) > new Date(latestByScenario[attempt.scenarioId].startedAt)
    ) {
      latestByScenario[attempt.scenarioId] = attempt;
    }
  }

  const uniqueScenarioAttempts = Object.values(latestByScenario);
  const totalUniqueCompleted = uniqueScenarioAttempts.length;

  // Calculate weighted overall score from unique scenario masteries
  const sumScores = uniqueScenarioAttempts.reduce((sum, a) => sum + a.accuracy, 0);
  const overallScore = Math.round(sumScores / totalUniqueCompleted);

  // Overall decision statistics across all attempts
  let totalDecisions = 0;
  let totalSafeDecisions = 0;
  let totalPoints = 0;
  let totalMaxPoints = 0;

  const missedCountMap: Partial<Record<IndicatorId, number>> = {};
  const caughtCountMap: Partial<Record<IndicatorId, number>> = {};

  let attemptsWithMistake = 0;
  let successfulRecoveries = 0;

  for (const attempt of completedAttempts) {
    totalDecisions += attempt.decisions.length;
    totalSafeDecisions += attempt.safeDecisionsCount;

    if (attempt.riskyDecisionsCount > 0) {
      attemptsWithMistake++;
      if (attempt.recovered) {
        successfulRecoveries++;
      }
    }

    for (const d of attempt.decisions) {
      totalPoints += d.pointsEarned;
      totalMaxPoints += d.maxPoints;

      for (const m of d.missedIndicators) {
        missedCountMap[m] = (missedCountMap[m] || 0) + 1;
      }
      for (const c of d.caughtIndicators) {
        caughtCountMap[c] = (caughtCountMap[c] || 0) + 1;
      }
    }
  }

  const overallAccuracy = totalMaxPoints > 0 ? Math.round((totalPoints / totalMaxPoints) * 100) : 0;
  const safeDecisionsRatio = totalDecisions > 0 ? Math.round((totalSafeDecisions / totalDecisions) * 100) : 0;

  const frequentlyMissedIndicators = Object.entries(missedCountMap)
    .map(([id, count]) => ({ indicatorId: id as IndicatorId, count: count! }))
    .sort((a, b) => b.count - a.count);

  const consistentlyCaughtIndicators = Object.entries(caughtCountMap)
    .map(([id, count]) => ({ indicatorId: id as IndicatorId, count: count! }))
    .sort((a, b) => b.count - a.count);

  const recoverySuccessRate =
    attemptsWithMistake > 0 ? Math.round((successfulRecoveries / attemptsWithMistake) * 100) : 100;

  // Sort recent attempts descending by time
  const sortedRecent = [...completedAttempts].sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
  );

  return {
    overallScore,
    isProvisional: totalUniqueCompleted === 1,
    totalScenariosCompleted: totalUniqueCompleted,
    totalDecisionsEvaluated: totalDecisions,
    overallAccuracy,
    safeDecisionsRatio,
    frequentlyMissedIndicators,
    consistentlyCaughtIndicators,
    recoverySuccessRate,
    recentAttempts: sortedRecent.slice(0, 10),
  };
}
