import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { StorageService } from '../services/storageService';
import { calculateOverallMetrics } from '../engine/scoreCalculator';
import { generatePersonalizedTips } from '../engine/personalizationEngine';
import { ALL_SCENARIOS } from '../data/scenarios';
import { INDICATOR_DEFINITIONS } from '../data/indicators';
import { useI18n } from '../i18n/I18nContext';
import { ScoreGauge } from '../components/dashboard/ScoreGauge';
import { PersonalizedTipCard } from '../components/dashboard/PersonalizedTipCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import {
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Lightbulb,
  Award,
  Sparkles,
  BarChart2,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { t } = useI18n();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Retrieve user records
  const attempts = useMemo(() => StorageService.getScenarioAttempts(), []);
  const metrics = useMemo(() => calculateOverallMetrics(attempts), [attempts]);
  const personalizedTips = useMemo(
    () => generatePersonalizedTips(metrics, attempts),
    [metrics, attempts]
  );

  // Identify next recommended scenario
  const recommendedScenario = useMemo(() => {
    // Look for scenario matching the top missed indicator
    if (personalizedTips.length > 0 && personalizedTips[0].scenarioIdToPractice) {
      const match = ALL_SCENARIOS.find((s) => s.id === personalizedTips[0].scenarioIdToPractice);
      if (match) return match;
    }
    // Else recommend an uncompleted scenario
    const completedIds = new Set(attempts.map((a) => a.scenarioId));
    const uncompleted = ALL_SCENARIOS.find((s) => !completedIds.has(s.id));
    return uncompleted || ALL_SCENARIOS[0];
  }, [personalizedTips, attempts]);

  const handleResetData = () => {
    StorageService.clearAllData();
    setIsResetModalOpen(false);
    window.location.reload();
  };

  // If user hasn't completed any scenario yet: clean Onboarding / Empty State
  if (metrics.totalScenariosCompleted === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 text-center">
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 mx-auto flex items-center justify-center border border-brand-100">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('common.empty_state_title')}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              {t('common.empty_state_desc')}
            </p>
          </div>

          <div className="pt-2">
            <Link to="/scenarios">
              <Button variant="primary" size="lg" className="w-full font-bold shadow-md shadow-brand-500/20">
                {t('home.hero.cta_start')}
              </Button>
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-400">
            {t('dashboard.demo_notice')}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('dashboard.title')}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            {t('dashboard.subtitle')}
          </p>
        </div>

        <button
          onClick={() => setIsResetModalOpen(true)}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-slate-50 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t('dashboard.reset_data_btn')}</span>
        </button>
      </div>

      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Overall Awareness Gauge Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs flex flex-col items-center justify-center text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t('dashboard.score_title')}
          </span>

          <ScoreGauge
            score={metrics.overallScore}
            isProvisional={metrics.isProvisional}
            size={180}
          />

          <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
            {metrics.isProvisional ? t('dashboard.provisional') : t('dashboard.verified')}
          </p>
        </div>

        {/* 4 Metrics Matrix Cards */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('dashboard.scenarios_completed')}
            </span>
            <div className="my-2">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                {metrics.totalScenariosCompleted}
              </span>
              <span className="text-xs text-slate-400 ml-1.5 font-bold">/ 5 total</span>
            </div>
            <span className="text-xs text-brand-600 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified completion
            </span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('dashboard.accuracy_rate')}
            </span>
            <div className="my-2">
              <span className="text-3xl sm:text-4xl font-black text-brand-600">
                {metrics.overallAccuracy}%
              </span>
            </div>
            <span className="text-xs text-slate-500 font-semibold">
              {metrics.totalDecisionsEvaluated} decisions evaluated
            </span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Safe Decisions Ratio
            </span>
            <div className="my-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-600">
                {metrics.safeDecisionsRatio}%
              </span>
            </div>
            <span className="text-xs text-slate-500 font-semibold">First-instinct defenses</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('dashboard.recovery_rate')}
            </span>
            <div className="my-2">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                {metrics.recoverySuccessRate}%
              </span>
            </div>
            <span className="text-xs text-slate-500 font-semibold">Halted damage after trap</span>
          </div>
        </div>
      </div>

      {/* Recommended Next Practice Banner */}
      {recommendedScenario && (
        <div className="bg-gradient-to-r from-brand-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <Badge variant="info" size="sm" className="bg-brand-500/20 text-brand-300 border-brand-400/40">
              {t('dashboard.recommended_next')}
            </Badge>
            <h3 className="text-lg sm:text-2xl font-black tracking-tight">
              {t(recommendedScenario.titleKey)}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {t(recommendedScenario.descriptionKey)}
            </p>
          </div>

          <Link to={`/simulate/${recommendedScenario.id}`} className="shrink-0">
            <Button variant="primary" size="md" className="font-bold shadow-md shadow-brand-500/30">
              <span>Start Drill</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      )}

      {/* Personalized Safety Tips Deck */}
      {personalizedTips.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {t('results.tips_heading')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {personalizedTips.map((tip) => (
              <PersonalizedTipCard key={tip.id} tip={tip} />
            ))}
          </div>
        </div>
      )}

      {/* Granular Strengths & Blind Spots Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Frequently Missed Indicators */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-rose-600">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {t('dashboard.missed_indicators_title')}
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            {t('dashboard.missed_indicators_desc')}
          </p>

          {metrics.frequentlyMissedIndicators.length === 0 ? (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-800 font-semibold">
              {t('dashboard.no_missed')}
            </div>
          ) : (
            <div className="space-y-2.5">
              {metrics.frequentlyMissedIndicators.slice(0, 5).map((item) => {
                const def = INDICATOR_DEFINITIONS[item.indicatorId];
                return (
                  <div
                    key={item.indicatorId}
                    className="p-3 bg-rose-50/50 rounded-xl border border-rose-100 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-800 block">
                        {def ? t(def.nameKey) : item.indicatorId}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {def ? t(def.descriptionKey) : ''}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-black shrink-0 text-[11px]">
                      {item.count} missed
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Consistently Caught Indicators */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-600">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {t('dashboard.caught_indicators_title')}
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            {t('dashboard.caught_indicators_desc')}
          </p>

          {metrics.consistentlyCaughtIndicators.length === 0 ? (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500 font-semibold">
              {t('dashboard.no_caught')}
            </div>
          ) : (
            <div className="space-y-2.5">
              {metrics.consistentlyCaughtIndicators.slice(0, 5).map((item) => {
                const def = INDICATOR_DEFINITIONS[item.indicatorId];
                return (
                  <div
                    key={item.indicatorId}
                    className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-800 block">
                        {def ? t(def.nameKey) : item.indicatorId}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {def ? t(def.descriptionKey) : ''}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black shrink-0 text-[11px]">
                      {item.count} caught
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Simulation Attempts History */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          {t('dashboard.recent_activity')}
        </h3>

        <div className="divide-y divide-slate-100">
          {metrics.recentAttempts.map((attempt) => {
            const sc = ALL_SCENARIOS.find((s) => s.id === attempt.scenarioId);
            return (
              <div
                key={attempt.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    {sc ? t(sc.titleKey) : attempt.scenarioId}
                  </h4>
                  <span className="text-xs text-slate-400">
                    {new Date(attempt.startedAt).toLocaleDateString()} •{' '}
                    {attempt.decisions.length} decisions evaluated
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {attempt.accuracy}%
                  </span>
                  <Link to={`/simulate/${attempt.scenarioId}`}>
                    <Button variant="outline" size="sm">
                      {t('scenarios.card.replay')}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title={t('dashboard.reset_data_btn')}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsResetModalOpen(false)}>
              {t('common.back')}
            </Button>
            <Button variant="danger" size="sm" onClick={handleResetData}>
              {t('dashboard.reset_data_btn')}
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600 leading-relaxed">
          {t('dashboard.reset_confirm')}
        </p>
      </Modal>
    </div>
  );
};
