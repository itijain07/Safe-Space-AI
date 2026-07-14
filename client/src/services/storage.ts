import { Journal, DailyMood, WritingStreak, AppSettings } from '@/types';

const STORAGE_KEYS = {
  JOURNALS: 'safe_space_journals',
  DAILY_MOODS: 'safe_space_daily_moods',
  WRITING_STREAK: 'safe_space_writing_streak',
  SETTINGS: 'safe_space_settings',
};

export const storageService = {
  // Journals
  getJournals: (): Journal[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.JOURNALS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveJournal: (journal: Journal): void => {
    try {
      const journals = storageService.getJournals();
      const index = journals.findIndex(j => j.id === journal.id);
      if (index >= 0) {
        journals[index] = journal;
      } else {
        journals.push(journal);
      }
      localStorage.setItem(STORAGE_KEYS.JOURNALS, JSON.stringify(journals));
    } catch (error) {
      console.error('Failed to save journal:', error);
    }
  },

  deleteJournal: (id: string): void => {
    try {
      const journals = storageService.getJournals();
      const filtered = journals.filter(j => j.id !== id);
      localStorage.setItem(STORAGE_KEYS.JOURNALS, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to delete journal:', error);
    }
  },

  getJournal: (id: string): Journal | null => {
    const journals = storageService.getJournals();
    return journals.find(j => j.id === id) || null;
  },

  // Daily Moods
  getDailyMoods: (): DailyMood[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DAILY_MOODS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveDailyMood: (mood: DailyMood): void => {
    try {
      const moods = storageService.getDailyMoods();
      const index = moods.findIndex(m => new Date(m.date).toDateString() === new Date(mood.date).toDateString());
      if (index >= 0) {
        moods[index] = mood;
      } else {
        moods.push(mood);
      }
      localStorage.setItem(STORAGE_KEYS.DAILY_MOODS, JSON.stringify(moods));
    } catch (error) {
      console.error('Failed to save daily mood:', error);
    }
  },

  getTodayMood: (): DailyMood | null => {
    const moods = storageService.getDailyMoods();
    const today = new Date().toDateString();
    return moods.find(m => new Date(m.date).toDateString() === today) || null;
  },

  // Writing Streak
  getWritingStreak: (): WritingStreak => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WRITING_STREAK);
      return data ? JSON.parse(data) : { current: 0, longest: 0, lastEntryDate: new Date() };
    } catch {
      return { current: 0, longest: 0, lastEntryDate: new Date() };
    }
  },

  updateWritingStreak: (streak: WritingStreak): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.WRITING_STREAK, JSON.stringify(streak));
    } catch (error) {
      console.error('Failed to update writing streak:', error);
    }
  },

  // Settings
  getSettings: (): AppSettings => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : { theme: 'dark', autoSave: true, autoSaveInterval: 30000 };
    } catch {
      return { theme: 'dark', autoSave: true, autoSaveInterval: 30000 };
    }
  },

  saveSettings: (settings: AppSettings): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  },

  // Export all data
  exportAllData: (): string => {
    const data = {
      journals: storageService.getJournals(),
      dailyMoods: storageService.getDailyMoods(),
      writingStreak: storageService.getWritingStreak(),
      settings: storageService.getSettings(),
      exportDate: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  },

  // Clear all data
  clearAllData: (): void => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Failed to clear data:', error);
    }
  },
};
