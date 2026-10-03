import React from 'react';
import { useI18n } from '../i18n/I18nContext';
import { Button } from '../components/ui/Button';
import {
  PhoneCall,
  ExternalLink,
  ShieldAlert,
  AlertTriangle,
  Lock,
  FileText,
  Camera,
  CheckCircle2,
} from 'lucide-react';

export const SafetyResourcesPage: React.FC = () => {
  const { t } = useI18n();

  const protocolSteps = [
    {
      num: 1,
      title: t('safety.step1.title'),
      desc: t('safety.step1.desc'),
      icon: <Lock className="w-5 h-5 text-rose-600" />,
    },
    {
      num: 2,
      title: t('safety.step2.title'),
      desc: t('safety.step2.desc'),
      icon: <PhoneCall className="w-5 h-5 text-brand-600" />,
    },
    {
      num: 3,
      title: t('safety.step3.title'),
      desc: t('safety.step3.desc'),
      icon: <ShieldAlert className="w-5 h-5 text-amber-600" />,
    },
    {
      num: 4,
      title: t('safety.step4.title'),
      desc: t('safety.step4.desc'),
      icon: <FileText className="w-5 h-5 text-indigo-600" />,
    },
    {
      num: 5,
      title: t('safety.step5.title'),
      desc: t('safety.step5.desc'),
      icon: <Camera className="w-5 h-5 text-emerald-600" />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t('safety.title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          {t('safety.subtitle')}
        </p>
      </div>

      {/* Emergency Callout Card */}
      <div className="bg-gradient-to-br from-rose-600 via-rose-700 to-rose-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-block text-xs uppercase tracking-widest font-black bg-white/20 px-3 py-1 rounded-full">
              24x7 NATIONAL EMERGENCY HELPLINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Dial 1930
            </h2>
            <p className="text-xs sm:text-sm text-rose-100 max-w-xl leading-relaxed">
              {t('safety.emergency_banner.desc')}
            </p>
          </div>

          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-rose-900 hover:bg-rose-50 font-black shadow-lg"
              icon={<ExternalLink className="w-5 h-5" />}
              iconPosition="right"
            >
              {t('safety.portal_link_btn')}
            </Button>
          </a>
        </div>
      </div>

      {/* Immediate Protocol (The Golden Hour) */}
      <div className="space-y-6">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {t('safety.action_checklist_title')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {protocolSteps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 font-black flex items-center justify-center text-sm">
                  {step.num}
                </span>
                {step.icon}
              </div>
              <h4 className="text-base font-bold text-slate-900">
                {step.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Links & Verification Portals */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          Official Government & Regulatory Links
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-brand-500 transition-colors flex items-center justify-between shadow-2xs"
          >
            <div>
              <span className="font-bold text-sm text-slate-900 block">
                National Cyber Crime Reporting Portal
              </span>
              <span className="text-xs text-slate-500">Official Portal: cybercrime.gov.in</span>
            </div>
            <ExternalLink className="w-4 h-4 text-brand-600 shrink-0" />
          </a>

          <a
            href="https://sancharsaathi.gov.in/sfc/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-brand-500 transition-colors flex items-center justify-between shadow-2xs"
          >
            <div>
              <span className="font-bold text-sm text-slate-900 block">
                Chakshu Portal (Suspected Fraud Calls)
              </span>
              <span className="text-xs text-slate-500">DoT Portal: sancharsaathi.gov.in</span>
            </div>
            <ExternalLink className="w-4 h-4 text-brand-600 shrink-0" />
          </a>

          <a
            href="https://www.sebi.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-brand-500 transition-colors flex items-center justify-between shadow-2xs"
          >
            <div>
              <span className="font-bold text-sm text-slate-900 block">
                SEBI Intermediary Verification Portal
              </span>
              <span className="text-xs text-slate-500">Official Portal: sebi.gov.in</span>
            </div>
            <ExternalLink className="w-4 h-4 text-brand-600 shrink-0" />
          </a>

          <a
            href="https://rbikehtahai.rbi.org.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-brand-500 transition-colors flex items-center justify-between shadow-2xs"
          >
            <div>
              <span className="font-bold text-sm text-slate-900 block">
                RBI Kehta Hai (Financial Literacy)
              </span>
              <span className="text-xs text-slate-500">Official Portal: rbikehtahai.rbi.org.in</span>
            </div>
            <ExternalLink className="w-4 h-4 text-brand-600 shrink-0" />
          </a>
        </div>
      </div>

      {/* Prominent Educational Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-2">
        <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>{t('safety.disclaimer_title')}</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-normal">
          {t('safety.disclaimer_desc')}
        </p>
      </div>
    </div>
  );
};
