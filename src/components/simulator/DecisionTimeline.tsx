import React, { useState } from 'react';
import { DecisionRecord, Scenario } from '../../types/scenarios';
import { useI18n } from '../../i18n/I18nContext';
import { INDICATOR_DEFINITIONS } from '../../data/indicators';
import { Badge } from '../ui/Badge';
import { ChevronDown, ChevronUp, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface DecisionTimelineProps {
  scenario: Scenario;
  decisions: DecisionRecord[];
}

export const DecisionTimeline: React.FC<DecisionTimelineProps> = ({ scenario, decisions }) => {
  const { t } = useI18n();
  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({});

  const toggleExpand = (index: number) => {
    setExpandedIndices((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (decisions.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center justify-between">
        <span>{t('results.timeline_title')}</span>
        <span className="text-xs font-semibold text-slate-500">
          {decisions.length} {t('results.decisions_evaluated')}
        </span>
      </h3>

      <div className="space-y-2.5">
        {decisions.map((decision, idx) => {
          const isExpanded = !!expandedIndices[idx];
          const node = scenario.nodes[decision.nodeId];
          const choice = node?.choices.find((c) => c.id === decision.choiceId);

          const statusIcon = {
            safe: <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />,
            partially_safe: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />,
            risky: <XCircle className="w-4 h-4 text-rose-600 shrink-0" />,
          }[decision.safetyLevel];

          return (
            <div
              key={decision.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
            >
              {/* Header clickable bar */}
              <button
                type="button"
                onClick={() => toggleExpand(idx)}
                className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  {statusIcon}
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                    {choice ? t(choice.textKey) : decision.choiceId}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-600">
                    +{decision.pointsEarned} {t('common.points')}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-2.5 text-xs sm:text-sm">
                  {/* Context situation */}
                  {node && (
                    <div>
                      <span className="font-bold text-[11px] text-slate-400 uppercase tracking-wider block">
                        Situation
                      </span>
                      <p className="text-slate-700 font-medium">{t(node.messageKey)}</p>
                    </div>
                  )}

                  {/* Indicators */}
                  <div className="flex flex-wrap gap-1">
                    {decision.caughtIndicators.map((id) => (
                      <Badge key={id} variant="safe" size="sm">
                        Caught: {INDICATOR_DEFINITIONS[id] ? t(INDICATOR_DEFINITIONS[id].nameKey) : id}
                      </Badge>
                    ))}
                    {decision.missedIndicators.map((id) => (
                      <Badge key={id} variant="danger" size="sm">
                        Missed: {INDICATOR_DEFINITIONS[id] ? t(INDICATOR_DEFINITIONS[id].nameKey) : id}
                      </Badge>
                    ))}
                  </div>

                  {/* Explanation */}
                  <div>
                    <span className="font-bold text-[11px] text-slate-400 uppercase tracking-wider block">
                      {t('simulator.why_matters')}
                    </span>
                    <p className="text-slate-600">{t(decision.explanationKey)}</p>
                  </div>

                  {/* Safer Alternative */}
                  {decision.saferAlternativeKey && (
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs">
                      <span className="font-bold text-amber-700 block">
                        {t('simulator.safer_alt')}:
                      </span>
                      <p className="text-slate-600 mt-0.5">{t(decision.saferAlternativeKey)}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
