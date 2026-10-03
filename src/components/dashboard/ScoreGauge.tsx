import React from 'react';

interface ScoreGaugeProps {
  score: number;
  isProvisional?: boolean;
  size?: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  isProvisional = false,
  size = 180,
}) => {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return '#10b981'; // emerald-500
    if (score >= 50) return '#f59e0b'; // amber-500
    return '#f43f5e'; // rose-500
  };

  const getLabel = () => {
    if (score >= 85) return 'Cyber Champion';
    if (score >= 70) return 'Vigilant User';
    if (score >= 50) return 'Needs Practice';
    return 'High Vulnerability';
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {score}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          out of 100
        </span>
      </div>

      <div className="mt-3 text-center">
        <span
          className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full border shadow-2xs"
          style={{
            borderColor: `${getColor()}40`,
            backgroundColor: `${getColor()}15`,
            color: getColor(),
          }}
        >
          {getLabel()}
        </span>
        {isProvisional && (
          <span className="block text-[11px] text-slate-400 font-medium mt-1">
            *Provisional Score
          </span>
        )}
      </div>
    </div>
  );
};
