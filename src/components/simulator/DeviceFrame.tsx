import React from 'react';
import { Wifi, Battery, Signal, ArrowLeft, Shield } from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';

interface DeviceFrameProps {
  children: React.ReactNode;
  headerTitle: string;
  categoryLabel: string;
  onBack?: () => void;
  senderName?: string;
  senderRole?: string;
  isVerified?: boolean;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  headerTitle,
  categoryLabel,
  onBack,
  senderName,
  senderRole,
  isVerified = false,
}) => {
  const { t } = useI18n();

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900 rounded-[2.5rem] p-3 sm:p-4 shadow-2xl border-4 border-slate-700/80">
      {/* Phone Inner Frame */}
      <div className="bg-slate-100 rounded-[2rem] overflow-hidden flex flex-col min-h-[580px] sm:min-h-[640px] border border-slate-300 relative shadow-inner">
        {/* Status Bar */}
        <div className="bg-slate-900 text-slate-300 px-6 py-2 flex items-center justify-between text-xs select-none">
          <span className="font-semibold tracking-wider text-slate-200">9:41 AM</span>
          <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto hidden sm:block" />
          <div className="flex items-center gap-2">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* App Bar / Simulated Header */}
        <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="p-1 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                aria-label={t('common.back')}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                {categoryLabel}
              </span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1">
                {headerTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-[11px] font-semibold text-amber-800">
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span>SIMULATION</span>
          </div>
        </div>

        {/* Scenario Message Context Header (if sender defined) */}
        {senderName && (
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-xs uppercase">
                {senderName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-slate-900">{senderName}</span>
                  {isVerified && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                      ✓
                    </span>
                  )}
                </div>
                {senderRole && <span className="text-slate-500 text-[11px] block">{senderRole}</span>}
              </div>
            </div>
          </div>
        )}

        {/* Screen Content Body */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto custom-scrollbar flex flex-col justify-between">
          {children}
        </div>

        {/* Home Indicator bar */}
        <div className="py-1.5 flex justify-center bg-slate-100 border-t border-slate-200">
          <div className="w-32 h-1 bg-slate-400 rounded-full" />
        </div>
      </div>
    </div>
  );
};
