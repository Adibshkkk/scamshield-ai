import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Lock,
  Smartphone,
  CheckCircle,
  HelpCircle,
  Users,
  Compass,
  Sparkles,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ALL_SCENARIOS } from '../data/scenarios';

export const HomePage: React.FC = () => {
  const { t } = useI18n();

  const categories = [
    {
      id: 'upi',
      name: t('scenarios.filter.upi'),
      scenarioId: 'upi-refund-trap',
      desc: 'Accidental transfer refund requests and collect debit traps on PhonePe/GPay.',
      icon: <Smartphone className="w-6 h-6 text-brand-500" />,
      tag: 'Most Prevalent',
    },
    {
      id: 'phishing',
      name: t('scenarios.filter.phishing'),
      scenarioId: 'urgent-bank-kyc',
      desc: 'Urgent 2-hour account suspension threats and lookalike bank domains (.xyz).',
      icon: <Lock className="w-6 h-6 text-rose-500" />,
      tag: 'Critical Risk',
    },
    {
      id: 'investment',
      name: t('scenarios.filter.investment'),
      scenarioId: 'guaranteed-investment',
      desc: 'Telegram VIP groups offering 500% guaranteed returns and advance TDS extortion.',
      icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
      tag: 'High Financial Loss',
    },
    {
      id: 'support',
      name: t('scenarios.filter.support'),
      scenarioId: 'fake-customer-support',
      desc: 'Impersonating electricity boards demanding QuickSupport/AnyDesk screen sharing.',
      icon: <AlertTriangle className="w-6 h-6 text-amber-500" />,
      tag: 'Malware Danger',
    },
    {
      id: 'shopping',
      name: t('scenarios.filter.shopping'),
      scenarioId: 'fake-shopping-discount',
      desc: '90% flash discount ads on Instagram demanding direct personal QR payments.',
      icon: <Compass className="w-6 h-6 text-indigo-500" />,
      tag: 'Social Ad Trap',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16 pb-12 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs sm:text-sm font-bold shadow-2xs">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>{t('home.hero.badge')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            {t('home.hero.title')}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            {t('home.hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link to="/scenarios" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto font-black shadow-lg shadow-brand-500/25"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                {t('home.hero.cta_start')}
              </Button>
            </Link>

            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto font-bold"
              >
                {t('home.hero.cta_dashboard')}
              </Button>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-10 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 block">5</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-500">{t('home.stats.users')}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-2xl sm:text-3xl font-black text-brand-600 block">10</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-500">{t('home.stats.scenarios')}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 block">100%</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-500">{t('home.stats.recovery')}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 block">EN/HI/MR</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-500">{t('home.stats.languages')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('home.categories.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t('home.categories.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {cat.icon}
                  </div>
                  <Badge variant="neutral" size="sm">
                    {cat.tag}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/simulate/${cat.scenarioId}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 hover:gap-2 transition-all"
                >
                  <span>{t('scenarios.card.start')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-slate-400 font-semibold">3-4 min</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-3 mb-12">
          <Badge variant="info" size="md" className="bg-brand-500/20 text-brand-300 border-brand-400/40">
            ENGINE ARCHITECTURE
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {t('home.features.title')}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {t('home.features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-white">
              {t('home.feature1.title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('home.feature1.desc')}
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-white">
              {t('home.feature2.title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('home.feature2.desc')}
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="text-lg font-bold text-white">
              {t('home.feature3.title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('home.feature3.desc')}
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg">
              4
            </div>
            <h3 className="text-lg font-bold text-white">
              {t('home.feature4.title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('home.feature4.desc')}
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/scenarios">
            <Button variant="primary" size="lg" className="font-bold">
              {t('home.hero.cta_start')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Zero Data & Privacy Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate-900">
              {t('home.privacy.title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t('home.privacy.desc')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
