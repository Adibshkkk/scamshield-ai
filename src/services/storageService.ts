import { QuizAttempt } from '../types/quiz';
import { ScenarioAttempt } from '../types/scenarios';
import { SupportedLanguage, UserProfile } from '../types/user';

const STORAGE_KEYS = {
  PROFILE: 'scamshield_user_profile_v1',
  SCENARIO_ATTEMPTS: 'scamshield_scenario_attempts_v1',
  QUIZ_ATTEMPTS: 'scamshield_quiz_attempts_v1',
  ACTIVE_SIMULATION_STATE: 'scamshield_active_sim_state_v1',
};

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'sess_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

export const StorageService = {
  getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Unable to read user profile from storage', e);
    }

    const newProfile: UserProfile = {
      sessionId: generateUUID(),
      preferredLanguage: 'en',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.saveUserProfile(newProfile);
    return newProfile;
  },

  saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(
        STORAGE_KEYS.PROFILE,
        JSON.stringify({ ...profile, updatedAt: new Date().toISOString() })
      );
    } catch (e) {
      console.warn('Unable to save user profile to storage', e);
    }
  },

  updateLanguagePreference(language: SupportedLanguage): void {
    const profile = this.getUserProfile();
    profile.preferredLanguage = language;
    this.saveUserProfile(profile);
  },

  getScenarioAttempts(): ScenarioAttempt[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SCENARIO_ATTEMPTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Unable to read scenario attempts', e);
    }
    return [];
  },

  saveScenarioAttempt(attempt: ScenarioAttempt): void {
    try {
      const attempts = this.getScenarioAttempts();
      const existingIndex = attempts.findIndex((a) => a.id === attempt.id);
      if (existingIndex >= 0) {
        attempts[existingIndex] = attempt;
      } else {
        attempts.unshift(attempt);
      }
      localStorage.setItem(STORAGE_KEYS.SCENARIO_ATTEMPTS, JSON.stringify(attempts));
    } catch (e) {
      console.warn('Unable to save scenario attempt', e);
    }
  },

  getQuizAttempts(): QuizAttempt[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Unable to read quiz attempts', e);
    }
    return [];
  },

  saveQuizAttempt(attempt: QuizAttempt): void {
    try {
      const attempts = this.getQuizAttempts();
      attempts.unshift(attempt);
      localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(attempts));
    } catch (e) {
      console.warn('Unable to save quiz attempt', e);
    }
  },

  clearAllData(): void {
    try {
      const currentProfile = this.getUserProfile();
      localStorage.removeItem(STORAGE_KEYS.SCENARIO_ATTEMPTS);
      localStorage.removeItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SIMULATION_STATE);
      // Keep profile session ID and language preference
      this.saveUserProfile({
        ...currentProfile,
        updatedAt: new Date().toISOString(),
      });
    } catch (e) {
      console.warn('Unable to clear data', e);
    }
  },

  saveActiveSimulationState(state: any): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SIMULATION_STATE, JSON.stringify(state));
    } catch (e) {
      console.warn('Unable to save active simulation state', e);
    }
  },

  getActiveSimulationState(): any | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_SIMULATION_STATE);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Unable to read active simulation state', e);
    }
    return null;
  },

  clearActiveSimulationState(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SIMULATION_STATE);
    } catch (e) {
      console.warn('Unable to clear active simulation state', e);
    }
  },
};
