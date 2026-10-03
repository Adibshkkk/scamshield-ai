import { describe, it, expect } from 'vitest';
import { en } from '../i18n/translations/en';
import { hi } from '../i18n/translations/hi';
import { mr } from '../i18n/translations/mr';
import { ALL_SCENARIOS } from '../data/scenarios';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

describe('Multilingual Translation Integrity', () => {
  it('should ensure all core app keys exist in English, Hindi, and Marathi', () => {
    const requiredKeys = [
      'app.name',
      'nav.home',
      'nav.scenarios',
      'nav.dashboard',
      'nav.quiz',
      'nav.learn',
      'nav.safety',
      'common.safe',
      'common.risky',
      'safety.emergency_banner.title',
    ];

    for (const key of requiredKeys) {
      expect(en[key as keyof typeof en]).toBeDefined();
      expect(hi[key as keyof typeof hi]).toBeDefined();
      expect(mr[key as keyof typeof mr]).toBeDefined();
    }
  });

  it('should ensure all 5 scenarios have translated titles, descriptions, and choices in all 3 languages', () => {
    for (const sc of ALL_SCENARIOS) {
      // Titles and descriptions
      expect(en[sc.titleKey as keyof typeof en]).toBeDefined();
      expect(hi[sc.titleKey as keyof typeof hi]).toBeDefined();
      expect(mr[sc.titleKey as keyof typeof mr]).toBeDefined();

      // Nodes & choices
      for (const node of Object.values(sc.nodes)) {
        expect(en[node.messageKey as keyof typeof en]).toBeDefined();
        expect(hi[node.messageKey as keyof typeof hi]).toBeDefined();
        expect(mr[node.messageKey as keyof typeof mr]).toBeDefined();

        for (const choice of node.choices) {
          expect(en[choice.textKey as keyof typeof en]).toBeDefined();
          expect(hi[choice.textKey as keyof typeof hi]).toBeDefined();
          expect(mr[choice.textKey as keyof typeof mr]).toBeDefined();
        }
      }
    }
  });

  it('should ensure all 10 quiz questions are translated into English, Hindi, and Marathi', () => {
    for (const q of QUIZ_QUESTIONS) {
      expect(en[q.questionKey as keyof typeof en]).toBeDefined();
      expect(hi[q.questionKey as keyof typeof hi]).toBeDefined();
      expect(mr[q.questionKey as keyof typeof mr]).toBeDefined();

      for (const optKey of q.optionsKeys) {
        expect(en[optKey as keyof typeof en]).toBeDefined();
        expect(hi[optKey as keyof typeof hi]).toBeDefined();
        expect(mr[optKey as keyof typeof mr]).toBeDefined();
      }
    }
  });
});
