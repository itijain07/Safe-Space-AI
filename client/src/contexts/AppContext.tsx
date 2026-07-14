import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Journal, DailyMood, WritingStreak, AppSettings } from '@/types';
import { storageService } from '@/services/storage';
import { nanoid } from 'nanoid';

interface AppContextType {
  journals: Journal[];
  currentJournal: Journal | null;
  dailyMoods: DailyMood[];
  writingStreak: WritingStreak;
  settings: AppSettings;
  createJournal: (title: string, content: string) => Journal;
  updateJournal: (journal: Journal) => void;
  deleteJournal: (id: string) => void;
  setCurrentJournal: (journal: Journal | null) => void;
  saveMood: (mood: DailyMood) => void;
  updateWritingStreak: (streak: WritingStreak) => void;
  updateSettings: (settings: AppSettings) => void;
  exportData: () => string;
  clearAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [currentJournal, setCurrentJournal] = useState<Journal | null>(null);
  const [dailyMoods, setDailyMoods] = useState<DailyMood[]>([]);
  const [writingStreak, setWritingStreak] = useState<WritingStreak>({ current: 0, longest: 0, lastEntryDate: new Date() });
  const [settings, setSettings] = useState<AppSettings>({ theme: 'dark', autoSave: true, autoSaveInterval: 30000 });

  useEffect(() => {
    setJournals(storageService.getJournals());
    setDailyMoods(storageService.getDailyMoods());
    setWritingStreak(storageService.getWritingStreak());
    setSettings(storageService.getSettings());
  }, []);

  const createJournal = (title: string, content: string): Journal => {
    const now = new Date();
    const journal: Journal = {
      id: nanoid(),
      title,
      content,
      createdAt: now,
      updatedAt: now,
    };
    storageService.saveJournal(journal);
    setJournals(prev => [...prev, journal]);
    return journal;
  };

  const updateJournal = (journal: Journal) => {
    const updated = { ...journal, updatedAt: new Date() };
    storageService.saveJournal(updated);
    setJournals(prev => prev.map(j => j.id === updated.id ? updated : j));
    if (currentJournal?.id === updated.id) {
      setCurrentJournal(updated);
    }
  };

  const deleteJournal = (id: string) => {
    storageService.deleteJournal(id);
    setJournals(prev => prev.filter(j => j.id !== id));
    if (currentJournal?.id === id) {
      setCurrentJournal(null);
    }
  };

  const saveMood = (mood: DailyMood) => {
    storageService.saveDailyMood(mood);
    setDailyMoods(prev => {
      const index = prev.findIndex(m => new Date(m.date).toDateString() === new Date(mood.date).toDateString());
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = mood;
        return updated;
      }
      return [...prev, mood];
    });
  };

  const updateWritingStreakState = (streak: WritingStreak) => {
    storageService.updateWritingStreak(streak);
    setWritingStreak(streak);
  };

  const updateSettingsState = (newSettings: AppSettings) => {
    storageService.saveSettings(newSettings);
    setSettings(newSettings);
  };

  const exportData = () => storageService.exportAllData();

  const clearAllData = () => {
    storageService.clearAllData();
    setJournals([]);
    setCurrentJournal(null);
    setDailyMoods([]);
    setWritingStreak({ current: 0, longest: 0, lastEntryDate: new Date() });
  };

  const value: AppContextType = {
    journals,
    currentJournal,
    dailyMoods,
    writingStreak,
    settings,
    createJournal,
    updateJournal,
    deleteJournal,
    setCurrentJournal,
    saveMood,
    updateWritingStreak: updateWritingStreakState,
    updateSettings: updateSettingsState,
    exportData,
    clearAllData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
