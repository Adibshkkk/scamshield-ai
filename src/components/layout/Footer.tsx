import React from 'react';
import { ShieldAlert, ExternalLink, PhoneCall, Heart } from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      {/* Emergency Callout Strip */}
      <div className="bg-gradient-to-r from-rose-900 to-rose-950 border-b border-rose-800/50 py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-full bg-rose-500 text-white animate-pulse">
              <PhoneCall className="w-4 h-4" />
            </span>
            <span className="text-white text-sm font-semibold tracking-wide">
              {t('safety.emergency_banner.title')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-200 hover:text-white underline underline-offset-4"
            >
              <span>cybercrime.gov.in</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              to="/safety"
              className="px-3 py-1 bg-white text-rose-900 text-xs font-bold rounded-lg hover:bg-rose-50 transition-colors"
            >
              {t('nav.safety')}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-black text-sm">
                SS
              </div>
              <span className="text-white font-extrabold text-lg tracking-tight">
                ScamShield AI
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {t('app.tagline')}. Safe, realistic, branching simulation practice to build unshakeable scam detection reflexes.
            </p>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs text-slate-400 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{t('safety.disclaimer_desc')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">
              {t('nav.scenarios')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/scenarios" className="hover:text-white transition-colors">
                  {t('scenarios.filter.upi')}
                </Link>
              </li>
              <li>
                <Link to="/scenarios" className="hover:text-white transition-colors">
                  {t('scenarios.filter.phishing')}
                </Link>
              </li>
              <li>
                <Link to="/scenarios" className="hover:text-white transition-colors">
                  {t('scenarios.filter.investment')}
                </Link>
              </li>
              <li>
                <Link to="/scenarios" className="hover:text-white transition-colors">
                  {t('scenarios.filter.support')}
                </Link>
              </li>
              <li>
                <Link to="/scenarios" className="hover:text-white transition-colors">
                  {t('scenarios.filter.shopping')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Resources */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">
              Official Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white"
                >
                  <span>National Cyber Crime Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://sancharsaathi.gov.in/sfc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white"
                >
                  <span>Chakshu Fraud Caller Reporting</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://rbikehtahai.rbi.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white"
                >
                  <span>RBI Kehta Hai (Financial Safety)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.sebi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white"
                >
                  <span>SEBI Regulatory Verification</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} ScamShield AI — Safe Educational Project for Hackathon Demonstration.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for India Digital Safety.
          </p>
        </div>
      </div>
    </footer>
  );
};
