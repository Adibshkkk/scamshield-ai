import React from 'react';
import { VisualContext } from '../../types/scenarios';
import {
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  ExternalLink,
  Globe,
  Lock,
  Phone,
  ShieldAlert,
  Users,
} from 'lucide-react';

interface VisualContextRendererProps {
  visualContext?: VisualContext;
  message: string;
}

export const VisualContextRenderer: React.FC<VisualContextRendererProps> = ({
  visualContext,
  message,
}) => {
  if (!visualContext) {
    return (
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-4">
        <p className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
          {message}
        </p>
      </div>
    );
  }

  switch (visualContext.type) {
    case 'upi_collect':
      return (
        <div className="space-y-3 mb-4">
          {/* UPI Collect Request Mockup Card */}
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-indigo-700/50">
            <div className="flex items-center justify-between border-b border-indigo-700/60 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-black text-xs text-white">
                  UPI
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-indigo-200 block font-semibold">
                    Payment Gateway
                  </span>
                  <span className="text-xs font-bold text-white">
                    {visualContext.senderName || 'Collect Request'}
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-rose-500/20 border border-rose-400/50 text-rose-300 text-[10px] font-extrabold rounded-md uppercase tracking-wider flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                {visualContext.badge || 'COLLECT REQUEST (DEBIT)'}
              </span>
            </div>

            <div className="my-3 text-center">
              <span className="text-xs text-slate-300 block mb-1">Requesting Amount</span>
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {visualContext.amount || '₹3,500'}
              </span>
              {visualContext.vpa && (
                <span className="text-xs text-indigo-300 font-mono block mt-1">
                  VPA: {visualContext.vpa}
                </span>
              )}
            </div>

            {visualContext.meta?.note && (
              <div className="bg-indigo-950/60 rounded-xl p-2.5 text-xs text-indigo-200 border border-indigo-800/40 text-center">
                Note: “{visualContext.meta.note}”
              </div>
            )}
          </div>

          {/* Incoming message thread */}
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
              {message}
            </p>
          </div>
        </div>
      );

    case 'sms':
      return (
        <div className="space-y-3 mb-4">
          {/* SMS Application Header */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                  SMS
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    {visualContext.senderId || 'Bank Notification'}
                  </span>
                  <span className="text-[10px] text-slate-400">Via Telecom Carrier</span>
                </div>
              </div>
              {visualContext.badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-md">
                  {visualContext.badge}
                </span>
              )}
            </div>

            {/* Message Bubble */}
            <div className="bg-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-slate-800 text-sm leading-relaxed">
              <p className="font-medium whitespace-pre-line">{message}</p>
              {visualContext.url && (
                <div className="mt-2.5 p-2 bg-white rounded-xl border border-slate-200 flex items-center gap-2 text-xs text-rose-600 font-mono break-all">
                  <Globe className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>{visualContext.url}</span>
                </div>
              )}
            </div>
            <span className="text-[10px] text-slate-400 mt-1.5 block text-right">Just now</span>
          </div>
        </div>
      );

    case 'fake_website':
      return (
        <div className="space-y-3 mb-4">
          {/* Browser Window Mockup */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Address Bar */}
            <div className="bg-slate-100 px-3 py-2 border-b border-slate-200 flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1 text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                <AlertTriangle className="w-3 h-3" />
                <span>Not Secure</span>
              </div>
              <div className="flex-1 bg-white px-2 py-1 rounded border border-slate-200 text-slate-600 font-mono text-[11px] truncate">
                {visualContext.url || 'http://portal-verify-bank.xyz'}
              </div>
            </div>

            {/* Simulated webpage content */}
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-slate-900 tracking-tight">
                  {visualContext.senderName || 'Bank Portal'}
                </span>
                {visualContext.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-100 text-rose-800 rounded">
                    {visualContext.badge}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                {message}
              </p>
            </div>
          </div>
        </div>
      );

    case 'call':
      return (
        <div className="space-y-3 mb-4">
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md text-center">
            <div className="w-14 h-14 rounded-full bg-slate-700 mx-auto mb-3 flex items-center justify-center">
              <Phone className="w-7 h-7 text-emerald-400 animate-pulse" />
            </div>
            <span className="text-xs text-slate-400 uppercase tracking-widest block font-semibold mb-1">
              Active Call
            </span>
            <h3 className="text-lg font-bold text-white mb-1">
              {visualContext.senderName || 'Unknown Caller'}
            </h3>
            {visualContext.badge && (
              <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-400/40 rounded-full mb-3">
                {visualContext.badge}
              </span>
            )}
            <div className="p-3 bg-slate-800/80 rounded-xl text-xs sm:text-sm text-slate-200 text-left border border-slate-700/60 leading-relaxed font-medium">
              {message}
            </div>
          </div>
        </div>
      );

    case 'investment_group':
      return (
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Telegram group header */}
            <div className="bg-sky-600 text-white px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-sky-800 flex items-center justify-center font-bold text-xs">
                  VIP
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold truncate max-w-[200px]">
                    {visualContext.senderName || 'Wealth Circle'}
                  </h4>
                  <span className="text-[10px] text-sky-100 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {visualContext.meta?.members || '4,200 members'}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-amber-400 text-slate-900 px-2 py-0.5 rounded">
                UNVERIFIED
              </span>
            </div>

            {/* Pinned announcement banner */}
            <div className="bg-amber-50 border-b border-amber-200 px-3 py-1.5 text-[11px] text-amber-900 font-semibold flex items-center justify-between">
              <span>📌 Claimed: {visualContext.meta?.claimedReturn || '600% in 48h'}</span>
              <span className="text-[10px] text-rose-600 font-black">HIGH RISK</span>
            </div>

            {/* Message Body */}
            <div className="p-4 text-slate-800 text-sm leading-relaxed font-medium whitespace-pre-line">
              {message}
            </div>
          </div>
        </div>
      );

    case 'chat':
    default:
      return (
        <div className="space-y-3 mb-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            {visualContext.badge && (
              <div className="mb-2">
                <span className="text-[11px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-md inline-block">
                  {visualContext.badge}
                </span>
              </div>
            )}
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium whitespace-pre-line">
              {message}
            </p>
          </div>
        </div>
      );
  }
};
