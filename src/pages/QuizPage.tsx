import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { useI18n } from '../i18n/I18nContext';
import { StorageService } from '../services/storageService';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award,
  Sparkles,
  Lightbulb,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Link } from 'react-router-dom';

export const QuizPage: React.FC = () => {
  const { t } = useI18n();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleCheckAnswer = () => {
    if (selectedOptionIndex === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOptionIndex === currentQuestion.correctAnswerIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
    } else {
      // Complete quiz
      const finalScore = Math.round(
        ((correctCount + (selectedOptionIndex === currentQuestion.correctAnswerIndex ? 0 : 0)) /
          QUIZ_QUESTIONS.length) *
          100
      );
      const userProfile = StorageService.getUserProfile();
      StorageService.saveQuizAttempt({
        id: `quiz-${Date.now()}`,
        sessionId: userProfile.sessionId,
        completedAt: new Date().toISOString(),
        totalQuestions: QUIZ_QUESTIONS.length,
        correctAnswersCount: correctCount,
        scorePercentage: finalScore,
      });

      setIsQuizCompleted(true);
      if (finalScore >= 70) {
        try {
          confetti({ particleCount: 70, spread: 60 });
        } catch {
          // ignore
        }
      }
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setCorrectCount(0);
    setIsQuizCompleted(false);
  };

  // Completed Quiz View
  if (isQuizCompleted) {
    const finalScore = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 mx-auto flex items-center justify-center border border-brand-100 shadow-sm">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('quiz.completed_title')}
            </h2>
            <p className="text-sm text-slate-600">
              {t('quiz.final_score')}: <strong className="text-slate-900">{correctCount}</strong> of{' '}
              {QUIZ_QUESTIONS.length} correct
            </p>
          </div>

          <div className="inline-block p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-4xl sm:text-5xl font-black text-brand-600 block">
              {finalScore}%
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {finalScore >= 80 ? 'Mastery Passed' : 'Keep Practicing'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
            <Button
              variant="outline"
              size="md"
              icon={<RotateCcw className="w-4 h-4" />}
              onClick={handleRetake}
            >
              {t('quiz.take_again')}
            </Button>
            <Link to="/scenarios">
              <Button variant="primary" size="md">
                {t('common.explore_more')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Quiz Top bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-600">
          <span>
            {t('quiz.question_num')} {currentIndex + 1} of {QUIZ_QUESTIONS.length}
          </span>
          <span>
            {t('quiz.score')}: {correctCount} / {currentIndex}
          </span>
        </div>
        <ProgressBar current={currentIndex + 1} total={QUIZ_QUESTIONS.length} showPercentage={false} />
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
          {t(currentQuestion.questionKey)}
        </h2>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQuestion.optionsKeys.map((optKey, idx) => {
            const isSelected = selectedOptionIndex === idx;
            const isCorrect = idx === currentQuestion.correctAnswerIndex;

            let cardStyles = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';
            if (isAnswerSubmitted) {
              if (isCorrect) {
                cardStyles = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
              } else if (isSelected && !isCorrect) {
                cardStyles = 'border-rose-500 bg-rose-50 text-rose-900 font-bold';
              } else {
                cardStyles = 'opacity-50 border-slate-200 bg-white text-slate-500';
              }
            } else if (isSelected) {
              cardStyles = 'border-brand-600 bg-brand-50/70 text-slate-900 shadow-2xs';
            }

            return (
              <button
                key={optKey}
                type="button"
                onClick={() => !isAnswerSubmitted && setSelectedOptionIndex(idx)}
                disabled={isAnswerSubmitted}
                className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm transition-all flex items-start gap-3 select-none cursor-pointer focus:outline-none ${cardStyles}`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                    isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {optionLetters[idx]}
                </span>
                <span className="leading-relaxed pt-0.5">{t(optKey)}</span>
              </button>
            );
          })}
        </div>

        {/* Immediate Explanation Box if submitted */}
        {isAnswerSubmitted && (
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-1 ${
              selectedOptionIndex === currentQuestion.correctAnswerIndex
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold">
              <Lightbulb className="w-4 h-4 shrink-0" />
              <span>{t('quiz.explanation')}</span>
            </div>
            <p className="font-medium pt-1 text-slate-700">
              {t(currentQuestion.explanationKey)}
            </p>
          </div>
        )}

        {/* Action Button: Check Answer or Next Question */}
        <div className="pt-2">
          {!isAnswerSubmitted ? (
            <Button
              variant="primary"
              size="md"
              className="w-full font-bold shadow-md shadow-brand-500/20"
              disabled={selectedOptionIndex === null}
              onClick={handleCheckAnswer}
            >
              {t('quiz.submit_answer')}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              className="w-full font-bold shadow-md shadow-brand-500/20"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={handleNextQuestion}
            >
              {currentIndex + 1 < QUIZ_QUESTIONS.length
                ? t('quiz.next_question')
                : 'Finish & View Score'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
