import React from 'react';
import { DecisionRecord } from '../../types/scenarios';
import { useI18n } from '../../i18n/I18nContext';
import { INDICATOR_DEFINITIONS } from '../../data/indicators';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Lightbulb,
} from 'lucide-react';

interface FeedbackPanelProps {
  decision: DecisionRecord;
  onContinue: () => void;
}

export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ decision, onContinue }) => {
  const { t } = useI18n();

  const safetyConfig = {
    safe: {
      badge: t('common.safe'),
      badgeVariant: 'safe' as const,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      border: 'border-emerald-200 bg-emerald-50/50',
    },
    partially_safe: {
      badge: t('common.partially_safe'),
      badgeVariant: 'warning' as const,
      icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
      border: 'border-amber-200 bg-amber-50/50',
    },
    risky: {
      badge: t('common.risky'),
      badgeVariant: 'danger' as const,
      icon: <XCircle className="w-5 h-5 text-rose-600" />,
      border: 'border-rose-200 bg-rose-50/50',
    },
  }[decision.safetyLevel];

  return (
    <div
      className={`rounded-2xl border-2 p-4 sm:p-5 shadow-sm space-y-4 animate-in fade-in-50 slide-in-from-bottom-2 duration-200 ${safetyConfig.border}`}
    >
      {/* Header bar: Safety status & Points */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-2">
          {safetyConfig.icon}
          <span className="font-extrabold text-sm sm:text-base text-slate-900">
            {t('simulator.feedback_title')}
          </span>
          <Badge variant={safetyConfig.badgeVariant} size="sm">
            {safetyConfig.badge}
          </Badge>
          {decision.isRecoveryChoice && (
            <Badge variant="safe" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
              {t('common.recovered')}
            </Badge>
          )}
        </div>
        <span className="font-black text-xs sm:text-sm text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
          +{decision.pointsEarned} / {decision.maxPoints} {t('common.points')}
        </span>
      </div>

      {/* Immediate consequence snippet */}
      <div className="bg-white/80 p-3 rounded-xl border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-800 flex items-start gap-2">
        <span className="text-brand-600 font-bold shrink-0">{t('simulator.consequence')}:</span>
        <span className="font-normal text-slate-700">{t(decision.consequenceKey)}</span>
      </div>

      {/* Indicators Evaluated: Caught & Missed */}
      <div className="space-y-2">
        {/* Caught Indicators */}
        {decision.caughtIndicators.length > 0 && (
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t('simulator.indicators_caught')} ({decision.caughtIndicators.length})
            </span>
            <div className="flex flex-wrap gap-1.5">
              {decision.caughtIndicators.map((id) => {
                const def = INDICATOR_DEFINITIONS[id];
                return (
                  <Badge key={id} variant="safe" size="sm">
                    {def ? t(def.nameKey) : id}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        {/* Missed Indicators */}
        {decision.missedIndicators.length > 0 && (
          <div>
            <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              {t('simulator.indicators_missed')} ({decision.missedIndicators.length})
            </span>
            <div className="flex flex-wrap gap-1.5">
              {decision.missedIndicators.map((id) => {
                const def = INDICATOR_DEFINITIONS[id];
                return (
                  <Badge key={id} variant="danger" size="sm">
                    {def ? t(def.nameKey) : id}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Explanation Details */}
      <div className="space-y-2 pt-1 border-t border-slate-200/60 text-xs sm:text-sm">
        <div>
          <span className="font-bold text-slate-900 block text-xs uppercase tracking-wide text-slate-500 mb-0.5">
            {t('simulator.why_matters')}
          </span>
          <p className="text-slate-700 leading-relaxed font-medium">
            {t(decision.explanationKey)}
          </p>
        </div>

        {decision.saferAlternativeKey && (
          <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-start gap-2 text-xs sm:text-sm">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block text-xs">
                {t('simulator.safer_alt')}:
              </span>
              <p className="text-slate-600 leading-relaxed font-medium mt-0.5">
                {t(decision.saferAlternativeKey)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Continue Button */}
      <div className="pt-2">
        <Button
          variant="primary"
          size="md"
          className="w-full font-bold shadow-md"
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          onClick={onContinue}
        >
          {t('simulator.next_step_btn')}
        </Button>
      </div>
    </div>
  );
};
