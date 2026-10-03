import React from 'react';
import { PersonalizedTip } from '../../types/user';
import { useI18n } from '../../i18n/I18nContext';
import { INDICATOR_DEFINITIONS } from '../../data/indicators';
import { Badge } from '../ui/Badge';
import { ArrowRight, Lightbulb, ShieldAlert, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PersonalizedTipCardProps {
  tip: PersonalizedTip;
}

export const PersonalizedTipCard: React.FC<PersonalizedTipCardProps> = ({ tip }) => {
  const { t } = useI18n();
  const indicatorDef = INDICATOR_DEFINITIONS[tip.relatedIndicatorId];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        {/* Header & Badges */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200/60">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 line-clamp-1">
              {t(tip.titleKey)}
            </h4>
          </div>
          {indicatorDef && (
            <Badge variant="neutral" size="sm">
              {t(indicatorDef.nameKey)}
            </Badge>
          )}
        </div>

        {/* Short explanation */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          {t(tip.shortExplanationKey)}
        </p>

        {/* Why recommended */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
          <span className="font-bold text-slate-700 block mb-0.5">Why recommended for you:</span>
          <span>{t(tip.whyRecommendedKey)}</span>
        </div>

        {/* Recommended Practice */}
        <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-100 text-xs text-brand-900">
          <span className="font-bold text-brand-800 block mb-0.5">Actionable Practice:</span>
          <span>{t(tip.recommendedPracticeKey)}</span>
        </div>
      </div>

      {/* Practice CTA Link */}
      {tip.scenarioIdToPractice && (
        <div className="pt-2 border-t border-slate-100">
          <Link
            to={`/simulate/${tip.scenarioIdToPractice}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline"
          >
            <span>Practice this skill in simulation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
};
