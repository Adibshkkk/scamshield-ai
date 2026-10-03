import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ALL_SCENARIOS } from '../data/scenarios';
import { useI18n } from '../i18n/I18nContext';
import { StorageService } from '../services/storageService';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Search,
  Clock,
  BarChart,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { ScenarioCategory } from '../types/scenarios';

export const ScenariosPage: React.FC = () => {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const attempts = useMemo(() => StorageService.getScenarioAttempts(), []);

  // Map latest attempt by scenario ID
  const latestAttemptsByScenario = useMemo(() => {
    const map: Record<string, (typeof attempts)[0]> = {};
    for (const a of attempts) {
      if (!map[a.scenarioId] || new Date(a.startedAt) > new Date(map[a.scenarioId].startedAt)) {
        map[a.scenarioId] = a;
      }
    }
    return map;
  }, [attempts]);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: t('scenarios.filter.all') },
    { id: 'upi_fraud', label: t('scenarios.filter.upi') },
    { id: 'phishing_sms', label: t('scenarios.filter.phishing') },
    { id: 'investment_fraud', label: t('scenarios.filter.investment') },
    { id: 'support_impersonation', label: t('scenarios.filter.support') },
    { id: 'shopping_scam', label: t('scenarios.filter.shopping') },
  ];

  const filteredScenarios = useMemo(() => {
    return ALL_SCENARIOS.filter((sc) => {
      // Category filter
      if (selectedCategory !== 'all' && sc.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const title = t(sc.titleKey).toLowerCase();
        const desc = t(sc.descriptionKey).toLowerCase();
        const obj = t(sc.learningObjectiveKey).toLowerCase();
        return (
          title.includes(query) ||
          desc.includes(query) ||
          obj.includes(query) ||
          sc.category.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery, t]);

  const difficultyVariant = (difficulty: string) => {
    if (difficulty === 'beginner') return 'safe' as const;
    if (difficulty === 'intermediate') return 'warning' as const;
    return 'danger' as const;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t('scenarios.title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
          {t('scenarios.subtitle')}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('scenarios.search.placeholder')}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Scenarios Grid */}
      {filteredScenarios.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No matching scenarios found</h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Try adjusting your search query or switching categories.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenarios.map((sc) => {
            const attempt = latestAttemptsByScenario[sc.id];
            const isCompleted = attempt?.completionStatus === 'completed';

            return (
              <div
                key={sc.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Badges Bar */}
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant={difficultyVariant(sc.difficulty)} size="sm">
                      {sc.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {sc.estimatedMinutes} {t('common.minutes')}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1.5">
                      {t(sc.titleKey)}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {t(sc.descriptionKey)}
                    </p>
                  </div>

                  {/* Learning Objective Box */}
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600">
                    <span className="font-bold text-slate-800 block mb-0.5">Objective:</span>
                    <span>{t(sc.learningObjectiveKey)}</span>
                  </div>
                </div>

                {/* Footer: Attempt Status & Action Button */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  {isCompleted && (
                    <div className="flex items-center justify-between text-xs bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                      <span className="text-emerald-800 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {t('scenarios.card.completed_badge')}
                      </span>
                      <span className="font-black text-emerald-900">
                        Score: {attempt.accuracy}%
                      </span>
                    </div>
                  )}

                  <Link to={`/simulate/${sc.id}`} className="block">
                    <Button
                      variant={isCompleted ? 'outline' : 'primary'}
                      size="md"
                      className="w-full font-bold shadow-2xs"
                      icon={isCompleted ? <RotateCcw className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      iconPosition={isCompleted ? 'left' : 'right'}
                    >
                      {isCompleted ? t('scenarios.card.replay') : t('scenarios.card.start')}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
