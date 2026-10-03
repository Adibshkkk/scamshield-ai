import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ALL_SCENARIOS, getScenarioById } from '../data/scenarios';
import { useI18n } from '../i18n/I18nContext';
import { StorageService } from '../services/storageService';
import {
  advanceToNextNode,
  initScenarioEngine,
  ScenarioEngineState,
  submitDecision,
} from '../engine/scenarioEngine';
import { DeviceFrame } from '../components/simulator/DeviceFrame';
import { VisualContextRenderer } from '../components/simulator/VisualContextRenderer';
import { ChoiceCard } from '../components/simulator/ChoiceCard';
import { FeedbackPanel } from '../components/simulator/FeedbackPanel';
import { ScenarioResultView } from '../components/simulator/ScenarioResultView';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { ShieldAlert, ArrowLeft, RotateCcw } from 'lucide-react';

export const SimulatorPage: React.FC = () => {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();

  const scenario = useMemo(() => (scenarioId ? getScenarioById(scenarioId) : undefined), [scenarioId]);

  const [engineState, setEngineState] = useState<ScenarioEngineState | null>(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Initialize engine state on scenario load
  useEffect(() => {
    if (!scenario) return;

    try {
      const userProfile = StorageService.getUserProfile();
      const state = initScenarioEngine(scenario, userProfile.sessionId);
      setEngineState(state);
      setSelectedChoiceId(null);
      setErrorMsg(null);
    } catch (e: any) {
      console.error('Failed to initialize scenario engine', e);
      setErrorMsg(e?.message || 'Failed to initialize simulation.');
    }
  }, [scenario]);

  if (!scenario) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-3xl mx-auto flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Scenario Not Found</h2>
        <p className="text-slate-600 text-sm">
          The requested simulation scenario does not exist or has been moved.
        </p>
        <Link to="/scenarios">
          <Button variant="primary" size="md">
            Return to Scenarios Library
          </Button>
        </Link>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-3xl mx-auto flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Simulation Error</h2>
        <p className="text-slate-600 text-sm">{errorMsg}</p>
        <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!engineState) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="inline-block w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-600">{t('common.loading')}</p>
      </div>
    );
  }

  const { currentNode, isCompleted, attempt, hasSubmittedCurrentDecision, lastDecisionResult } =
    engineState;

  // Handle choice submission
  const handleSubmitChoice = () => {
    if (!selectedChoiceId) return;

    try {
      const updatedState = submitDecision(engineState, selectedChoiceId);
      setEngineState(updatedState);
      setErrorMsg(null);
    } catch (e: any) {
      setErrorMsg(e?.message || 'Error evaluating decision.');
    }
  };

  // Handle advancing to next branch
  const handleAdvance = () => {
    try {
      const updatedState = advanceToNextNode(engineState);
      setEngineState(updatedState);
      setSelectedChoiceId(null);
      setErrorMsg(null);

      // If finished, persist attempt
      if (updatedState.isCompleted) {
        StorageService.saveScenarioAttempt(updatedState.attempt);
      }
    } catch (e: any) {
      setErrorMsg(e?.message || 'Error advancing to next step.');
    }
  };

  // Handle replaying scenario
  const handleRetry = () => {
    const userProfile = StorageService.getUserProfile();
    const state = initScenarioEngine(scenario, userProfile.sessionId);
    setEngineState(state);
    setSelectedChoiceId(null);
    setErrorMsg(null);
  };

  // Compute next scenario ID for flow continuity
  const currentIndex = ALL_SCENARIOS.findIndex((s) => s.id === scenario.id);
  const nextScenario = ALL_SCENARIOS[(currentIndex + 1) % ALL_SCENARIOS.length];
  const nextScenarioId = nextScenario && nextScenario.id !== scenario.id ? nextScenario.id : undefined;

  // If completed, render the full scenario results view
  if (isCompleted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <ScenarioResultView
          scenario={scenario}
          attempt={attempt}
          onRetry={handleRetry}
          nextScenarioId={nextScenarioId}
        />
      </div>
    );
  }

  const choiceLetters = ['A', 'B', 'C', 'D'];
  const stepNumber = currentNode.stepNumber || 1;
  const estimatedTotalSteps = 3;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
      {/* Simulation Top Bar */}
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
        <button
          onClick={() => navigate('/scenarios')}
          className="inline-flex items-center gap-1.5 font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('scenarios.title')}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-700">
            {t('simulator.step')} {stepNumber} {t('simulator.of')} {estimatedTotalSteps}
          </span>
          <button
            onClick={handleRetry}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            title={t('common.retry')}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto">
        <ProgressBar
          current={stepNumber}
          total={estimatedTotalSteps}
          showPercentage={false}
          color="brand"
        />
      </div>

      {/* Realistic Device Frame */}
      <DeviceFrame
        headerTitle={t(scenario.titleKey)}
        categoryLabel={t(`scenarios.filter.${scenario.category.replace('_fraud', '').replace('_sms', '')}`)}
        onBack={() => navigate('/scenarios')}
        senderName={currentNode.sender?.name}
        senderRole={currentNode.sender?.roleKey ? t(currentNode.sender.roleKey) : undefined}
        isVerified={currentNode.sender?.isVerified}
      >
        <div className="space-y-4">
          {/* Fictional Safe Banner */}
          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-tight font-medium flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{t('common.fictional_warning')}</span>
          </div>

          {/* Contextual Visual Mockup (UPI collect, SMS bubble, browser, call) */}
          <VisualContextRenderer
            visualContext={currentNode.visualContext}
            message={t(currentNode.messageKey)}
          />

          {/* Decision Choices or Post-Decision Feedback */}
          {!hasSubmittedCurrentDecision ? (
            <div className="space-y-3 pt-2">
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 block">
                {t('simulator.choice_prompt')}
              </span>

              <div className="space-y-2">
                {currentNode.choices.map((choice, index) => (
                  <ChoiceCard
                    key={choice.id}
                    id={choice.id}
                    letter={choiceLetters[index] || String(index + 1)}
                    text={t(choice.textKey)}
                    isSelected={selectedChoiceId === choice.id}
                    onSelect={() => setSelectedChoiceId(choice.id)}
                    disabled={hasSubmittedCurrentDecision}
                  />
                ))}
              </div>

              {/* Submit Decision Button */}
              <div className="pt-3">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full font-black shadow-md shadow-brand-500/20"
                  disabled={!selectedChoiceId || hasSubmittedCurrentDecision}
                  onClick={handleSubmitChoice}
                >
                  {t('simulator.submit_btn')}
                </Button>
              </div>
            </div>
          ) : (
            lastDecisionResult && (
              <FeedbackPanel decision={lastDecisionResult} onContinue={handleAdvance} />
            )
          )}
        </div>
      </DeviceFrame>
    </div>
  );
};
