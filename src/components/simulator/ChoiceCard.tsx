import React from 'react';

interface ChoiceCardProps {
  id: string;
  letter: string;
  text: string;
  isSelected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  letter,
  text,
  isSelected,
  onSelect,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-150 flex items-start gap-3 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
        isSelected
          ? 'border-brand-600 bg-brand-50/70 text-slate-900 shadow-sm'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
      } ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      <span
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs sm:text-sm font-black shrink-0 transition-colors ${
          isSelected
            ? 'bg-brand-600 text-white shadow-sm'
            : 'bg-slate-100 text-slate-600 border border-slate-200'
        }`}
      >
        {letter}
      </span>
      <span className="text-xs sm:text-sm font-semibold leading-relaxed pt-0.5 sm:pt-1">
        {text}
      </span>
    </button>
  );
};
