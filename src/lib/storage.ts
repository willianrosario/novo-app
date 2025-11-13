// Funções para gerenciar localStorage

import type { BabyProfile, SleepRecord, FeedingRecord, BathRecord, ComfortRecord, DiaperRecord, AIReminder } from './types';

const STORAGE_KEYS = {
  PROFILE: 'baby_profile',
  SLEEP: 'sleep_records',
  FEEDING: 'feeding_records',
  BATH: 'bath_records',
  COMFORT: 'comfort_records',
  DIAPER: 'diaper_records',
  REMINDERS: 'ai_reminders',
};

// Profile
export const saveProfile = (profile: BabyProfile) => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
};

export const getProfile = (): BabyProfile | null => {
  const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
  return data ? JSON.parse(data) : null;
};

// Sleep Records
export const saveSleepRecord = (record: SleepRecord) => {
  const records = getSleepRecords();
  records.unshift(record);
  localStorage.setItem(STORAGE_KEYS.SLEEP, JSON.stringify(records));
};

export const getSleepRecords = (): SleepRecord[] => {
  const data = localStorage.getItem(STORAGE_KEYS.SLEEP);
  return data ? JSON.parse(data) : [];
};

export const updateSleepRecord = (id: string, updates: Partial<SleepRecord>) => {
  const records = getSleepRecords();
  const index = records.findIndex(r => r.id === id);
  if (index !== -1) {
    records[index] = { ...records[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.SLEEP, JSON.stringify(records));
  }
};

// Feeding Records
export const saveFeedingRecord = (record: FeedingRecord) => {
  const records = getFeedingRecords();
  records.unshift(record);
  localStorage.setItem(STORAGE_KEYS.FEEDING, JSON.stringify(records));
};

export const getFeedingRecords = (): FeedingRecord[] => {
  const data = localStorage.getItem(STORAGE_KEYS.FEEDING);
  return data ? JSON.parse(data) : [];
};

// Bath Records
export const saveBathRecord = (record: BathRecord) => {
  const records = getBathRecords();
  records.unshift(record);
  localStorage.setItem(STORAGE_KEYS.BATH, JSON.stringify(records));
};

export const getBathRecords = (): BathRecord[] => {
  const data = localStorage.getItem(STORAGE_KEYS.BATH);
  return data ? JSON.parse(data) : [];
};

// Comfort Records
export const saveComfortRecord = (record: ComfortRecord) => {
  const records = getComfortRecords();
  records.unshift(record);
  localStorage.setItem(STORAGE_KEYS.COMFORT, JSON.stringify(records));
};

export const getComfortRecords = (): ComfortRecord[] => {
  const data = localStorage.getItem(STORAGE_KEYS.COMFORT);
  return data ? JSON.parse(data) : [];
};

// Diaper Records
export const saveDiaperRecord = (record: DiaperRecord) => {
  const records = getDiaperRecords();
  records.unshift(record);
  localStorage.setItem(STORAGE_KEYS.DIAPER, JSON.stringify(records));
};

export const getDiaperRecords = (): DiaperRecord[] => {
  const data = localStorage.getItem(STORAGE_KEYS.DIAPER);
  return data ? JSON.parse(data) : [];
};

// AI Reminders
export const saveReminder = (reminder: AIReminder) => {
  const reminders = getReminders();
  reminders.unshift(reminder);
  localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
};

export const getReminders = (): AIReminder[] => {
  const data = localStorage.getItem(STORAGE_KEYS.REMINDERS);
  return data ? JSON.parse(data) : [];
};

export const dismissReminder = (id: string) => {
  const reminders = getReminders();
  const updated = reminders.map(r => r.id === id ? { ...r, dismissed: true } : r);
  localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(updated));
};

export const clearOldReminders = () => {
  const reminders = getReminders();
  const now = new Date();
  const filtered = reminders.filter(r => {
    const reminderTime = new Date(r.time);
    const hoursDiff = (now.getTime() - reminderTime.getTime()) / (1000 * 60 * 60);
    return hoursDiff < 24; // Mantém apenas últimas 24h
  });
  localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(filtered));
};

// Utility
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};
