import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Scenario, ScenarioAttempt } from '../../types/scenarios';
import { useI18n } from '../../i18n/I18nContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { DecisionTimeline } from './DecisionTimeline';
import {
  RotateCcw,
  Compass,
  LayoutDashboard,
  ShieldCheck,
  ShieldAlert,
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScenarioResultViewProps {
  scenario: Scenario;
  attempt: ScenarioAttempt;
  onRetry: () => void;
  nextScenarioId?: string;
}

export const ScenarioResultView: React.FC<ScenarioResultViewProps> = ({
  scenario,
  attempt,
  onRetry,
  nextScenarioId,
}) => {
  const { t } = useI18n();

  useEffect(() => {
    if (attempt.accuracy >= 75 || attempt.recovered) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore confetti errors
      }
    }
  }, [attempt]);

  const endingConfig = {
    safe_prevention: {
      title: t(scenario.nodes[scenario.startNodeId]?.endingTitleKey || 'scenario.upi.ending_safe.title'),
      desc: t('scenario.upi.ending_safe.message'),
      takeaway: t('scenario.upi.ending_safe.summary'),
      badge: t('common.safe_prevention'),
      badgeVariant: 'safe' as const,
      icon: <ShieldCheck className="w-10 h-10 text-emerald-500" />,
      border: 'border-emerald-200 bg-emerald-50/40',
    },
    successful_recovery: {
      title: t('scenario.upi.ending_recovered.title'),
      desc: t('scenario.upi.ending_recovered.message'),
      takeaway: t('scenario.upi.ending_recovered.summary'),
      badge: t('common.recovered'),
      badgeVariant: 'safe' as const,
      icon: <Sparkles className="w-10 h-10 text-emerald-500" />,
      border: 'border-emerald-200 bg-emerald-50/40',
    },
    compromised: {
      title: t('scenario.upi.ending_compromised.title'),
      desc: t('scenario.upi.ending_compromised.message'),
      takeaway: t('scenario.upi.ending_compromised.summary'),
      badge: t('common.compromised'),
      badgeVariant: 'danger' as const,
      icon: <ShieldAlert className="w-10 h-10 text-rose-500" />,
      border: 'border-rose-200 bg-rose-50/40',
    },
    partial_loss: {
      title: t('scenario.upi.ending_recovered.title'),
      desc: t('scenario.upi.ending_recovered.message'),
      takeaway: t('scenario.upi.ending_recovered.summary'),
      badge: t('common.partially_safe'),
      badgeVariant: 'warning' as const,
      icon: <AlertTriangle className="w-10 h-10 text-amber-500" />,
      border: 'border-amber-200 bg-amber-50/40',
    },
  }[attempt.endingType || 'safe_prevention'];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Hero Outcome Card */}
      <div
        className={`rounded-3xl border-2 p-6 sm:p-8 text-center space-y-4 shadow-sm ${endingConfig.border}`}
      >
        <div className="w-16 h-16 rounded-2xl bg-white shadow-md mx-auto flex items-center justify-center border border-slate-100">
          {endingConfig.icon}
        </div>

        <div>
          <div className="mb-2">
            <Badge variant={endingConfig.badgeVariant} size="lg">
              {endingConfig.badge}
            </Badge>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {endingConfig.title}
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
            {endingConfig.desc}
          </p>
        </div>

        {/* Score Ring Display */}
        <div className="pt-2">
          <div className="inline-flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              {t('results.awareness_score')}
            </span>
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {attempt.accuracy}%
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-1">
              {attempt.totalScore} / {attempt.maxScore} {t('common.points')}
            </span>
          </div>
        </div>

        {/* Key Takeaway Banner */}
        <div className="p-3.5 bg-white/90 rounded-2xl border border-slate-200 text-left text-xs sm:text-sm shadow-2xs">
          <span className="font-extrabold text-brand-700 block mb-0.5">
            {t('results.key_takeaway')}:
          </span>
          <p className="text-slate-700 leading-relaxed font-medium">
            {endingConfig.takeaway}
          </p>
        </div>
      </div>

      {/* Decisions Statistics Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 text-center shadow-2xs">
          <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold">{t('results.safe_decisions')}</span>
          </div>
          <span className="text-2xl font-black text-slate-900">
            {attempt.safeDecisionsCount}
          </span>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 text-center shadow-2xs">
          <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-bold">{t('results.partial_decisions')}</span>
          </div>
          <span className="text-2xl font-black text-slate-900">
            {attempt.partialDecisionsCount}
          </span>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 text-center shadow-2xs">
          <div className="flex items-center justify-center gap-1 text-rose-600 mb-1">
            <XCircle className="w-4 h-4" />
            <span className="text-xs font-bold">{t('results.risky_decisions')}</span>
          </div>
          <span className="text-2xl font-black text-slate-900">
            {attempt.riskyDecisionsCount}
          </span>
        </div>
      </div>

      {/* Decision Timeline Audit */}
      <div className="bg-slate-50 p-4 sm:p-6 rounded-3xl border border-slate-200">
        <DecisionTimeline scenario={scenario} decisions={attempt.decisions} />
      </div>

      {/* Working Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          variant="outline"
          size="md"
          className="flex-1 font-bold"
          icon={<RotateCcw className="w-4 h-4" />}
          onClick={onRetry}
        >
          {t('common.retry')}
        </Button>

        {nextScenarioId && (
          <Link to={`/simulate/${nextScenarioId}`} className="flex-1">
            <Button
              variant="primary"
              size="md"
              className="w-full font-bold shadow-md"
              icon={<Compass className="w-4 h-4" />}
            >
              {t('common.explore_more')}
            </Button>
          </Link>
        )}

        <Link to="/dashboard" className="flex-1">
          <Button
            variant="secondary"
            size="md"
            className="w-full font-bold shadow-sm"
            icon={<LayoutDashboard className="w-4 h-4" />}
          >
            {t('common.view_dashboard')}
          </Button>
        </Link>
      </div>
    </div>
  );
};
