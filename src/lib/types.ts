// Tipos para o app de monitoramento de bebês

export interface BabyProfile {
  name: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  createdAt: string;
  preferences: BabyPreferences;
}

export interface BabyPreferences {
  // Alimentação
  feedingType: 'breast' | 'bottle' | 'both';
  feedingInterval: number; // horas entre mamadas
  
  // Sono
  sleepPattern: 'light' | 'normal' | 'heavy';
  wakeUpInterval: number; // horas entre acordadas
  
  // Comportamento
  usesPacifier: boolean;
  criesOften: boolean;
  
  // Conforto
  temperatureSensitivity: 'low' | 'normal' | 'high';
}

export interface SleepRecord {
  id: string;
  startTime: string;
  endTime?: string;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  notes?: string;
  createdAt: string;
}

export interface FeedingRecord {
  id: string;
  time: string;
  type: 'breast' | 'bottle' | 'solid';
  amount?: number; // ml para mamadeira
  duration?: number; // minutos para amamentação
  notes?: string;
  createdAt: string;
}

export interface BathRecord {
  id: string;
  time: string;
  temperature?: number;
  notes?: string;
  createdAt: string;
}

export interface ComfortRecord {
  id: string;
  time: string;
  temperature: 'cold' | 'comfortable' | 'hot';
  notes?: string;
  createdAt: string;
}

export interface DiaperRecord {
  id: string;
  time: string;
  type: 'wet' | 'dirty' | 'both';
  notes?: string;
  createdAt: string;
}

export interface AIReminder {
  id: string;
  type: 'feeding' | 'sleep' | 'diaper' | 'bath';
  message: string;
  time: string;
  priority: 'low' | 'medium' | 'high';
  dismissed: boolean;
}

export interface Milestone {
  ageMonths: number;
  title: string;
  description: string;
  category: 'feeding' | 'development' | 'sleep';
}

export const MILESTONES: Milestone[] = [
  {
    ageMonths: 0,
    title: 'Recém-nascido',
    category: 'feeding',
    description: 'Apenas leite materno ou fórmula. Mamadas frequentes a cada 2-3 horas.'
  },
  {
    ageMonths: 4,
    title: 'Introdução de papinhas',
    category: 'feeding',
    description: 'Pode começar a introduzir papinhas de frutas amassadas (banana, maçã cozida).'
  },
  {
    ageMonths: 6,
    title: 'Papinhas salgadas',
    category: 'feeding',
    description: 'Introdução de papinhas salgadas com legumes, proteínas e carboidratos.'
  },
  {
    ageMonths: 8,
    title: 'Texturas variadas',
    category: 'feeding',
    description: 'Pode começar a oferecer alimentos com pedacinhos pequenos.'
  },
  {
    ageMonths: 12,
    title: 'Alimentação da família',
    category: 'feeding',
    description: 'Pode comer a maioria dos alimentos da família, bem picados.'
  }
];
