import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  Globe,
  Menu,
  X,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';
import { StorageService } from '../../services/storageService';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { SupportedLanguage } from '../../types/user';

export const Navbar: React.FC = () => {
  const { t, language, setLanguage, supportedLanguages } = useI18n();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/scenarios', label: t('nav.scenarios') },
    { to: '/dashboard', label: t('nav.dashboard') },
    { to: '/quiz', label: t('nav.quiz') },
    { to: '/learn', label: t('nav.learn') },
    { to: '/safety', label: t('nav.safety'), highlight: true },
  ];

  const handleReset = () => {
    StorageService.clearAllData();
    setIsResetModalOpen(false);
    // Reload or notify
    window.location.reload();
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 text-lg tracking-tight flex items-center gap-1.5">
                  ScamShield <span className="text-brand-600 font-black">AI</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium -mt-1 hidden sm:block tracking-wide">
                  Financial Scam Simulator
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(link.to)
                      ? 'bg-brand-50 text-brand-700 font-bold'
                      : link.highlight
                      ? 'text-rose-600 hover:bg-rose-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Controls: Language Selector & Reset */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Switcher */}
              <div className="relative flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <Globe className="w-4 h-4 text-slate-500 ml-1.5 mr-1" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                  className="bg-transparent text-xs sm:text-sm font-bold text-slate-700 py-1 pr-2 rounded-lg focus:outline-none cursor-pointer"
                  aria-label={t('nav.language')}
                >
                  {supportedLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-white text-slate-900">
                      {lang.nativeLabel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Data Button (Desktop) */}
              <button
                onClick={() => setIsResetModalOpen(true)}
                className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-500 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                title={t('nav.reset_progress')}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('nav.reset_progress')}</span>
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive(link.to)
                    ? 'bg-brand-50 text-brand-700 font-bold'
                    : link.highlight
                    ? 'text-rose-600 hover:bg-rose-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsResetModalOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t('nav.reset_progress')}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Confirmation Modal for Resetting Demo Data */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title={t('dashboard.reset_data_btn')}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsResetModalOpen(false)}>
              {t('common.back')}
            </Button>
            <Button variant="danger" size="sm" onClick={handleReset}>
              {t('dashboard.reset_data_btn')}
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600 leading-relaxed">
          {t('dashboard.reset_confirm')}
        </p>
      </Modal>
    </>
  );
};
