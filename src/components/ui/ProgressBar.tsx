import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'brand' | 'safe' | 'warning' | 'danger';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  showPercentage = true,
  color = 'brand',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((current / (total || 1)) * 100)));

  const barColors = {
    brand: 'bg-brand-600',
    safe: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
  }[color];

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs md:text-sm font-medium text-slate-700 mb-1.5">
          {label && <span>{label}</span>}
          {showPercentage && <span className="text-slate-500 ml-auto">{percentage}%</span>}
        </div>
      )}
      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${barColors}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
        />
      </div>
    </div>
  );
};
