import React, { useMemo, useState } from 'react';
import { LEARNING_TOPICS } from '../data/learningResources';
import { useI18n } from '../i18n/I18nContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  BookOpen,
  Search,
  AlertTriangle,
  ShieldCheck,
  Award,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const LearningCenterPage: React.FC = () => {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Guides' },
    { id: 'upi', label: 'UPI & QR' },
    { id: 'phishing', label: 'SMS & Phishing' },
    { id: 'investment', label: 'Investments' },
    { id: 'impersonation', label: 'Fake Support' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'reporting', label: 'Emergency Protocol' },
  ];

  const filteredTopics = useMemo(() => {
    return LEARNING_TOPICS.filter((topic) => {
      if (selectedCategory !== 'all' && topic.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const title = t(topic.titleKey).toLowerCase();
        const summary = t(topic.summaryKey).toLowerCase();
        const rule = t(topic.goldenRuleKey).toLowerCase();
        return title.includes(query) || summary.includes(query) || rule.includes(query);
      }
      return true;
    });
  }, [selectedCategory, searchQuery, t]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t('learn.title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
          {t('learn.subtitle')}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
        {/* Category Pills */}
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

        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('learn.search_placeholder')}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Topics List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="neutral" size="sm" className="uppercase font-bold">
                  {topic.category}
                </Badge>
                <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1">
                  {t(topic.titleKey)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {t(topic.summaryKey)}
                </p>
              </div>

              {/* Warning Signs */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {t('learn.warning_signs')}
                </span>
                <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                  {topic.warningSignsKeys.map((k) => (
                    <li key={k} className="leading-relaxed">
                      {t(k)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safe Actions */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t('learn.safe_actions')}
                </span>
                <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                  {topic.safeActionsKeys.map((k) => (
                    <li key={k} className="leading-relaxed">
                      {t(k)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Golden Rule Card */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <span className="font-extrabold block mb-0.5">{t('learn.golden_rule')}:</span>
                <span className="font-medium">{t(topic.goldenRuleKey)}</span>
              </div>
            </div>

            {/* Practice CTA */}
            {topic.relatedScenarioId && (
              <div className="pt-4 border-t border-slate-100">
                <Link to={`/simulate/${topic.relatedScenarioId}`} className="block">
                  <Button variant="outline" size="sm" className="w-full font-bold">
                    <span>{t('learn.practice_btn')}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
