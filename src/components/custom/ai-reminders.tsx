'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, X, Milk, Moon, Droplets, Bath, AlertCircle } from 'lucide-react';
import type { AIReminder, BabyProfile, FeedingRecord, SleepRecord } from '@/lib/types';
import { getReminders, saveReminder, dismissReminder, getFeedingRecords, getSleepRecords } from '@/lib/storage';
import { toast } from 'sonner';

interface AIRemindersProps {
  profile: BabyProfile;
}

export function AIReminders({ profile }: AIRemindersProps) {
  const [reminders, setReminders] = useState<AIReminder[]>([]);

  useEffect(() => {
    loadReminders();
    const interval = setInterval(() => {
      checkAndCreateReminders();
    }, 60000); // Verifica a cada minuto

    return () => clearInterval(interval);
  }, [profile]);

  const loadReminders = () => {
    const allReminders = getReminders();
    const active = allReminders.filter(r => !r.dismissed);
    setReminders(active);
  };

  const checkAndCreateReminders = () => {
    const now = new Date();
    const feedingRecords = getFeedingRecords();
    const sleepRecords = getSleepRecords();

    // Verificar última mamada
    if (feedingRecords.length > 0) {
      const lastFeeding = new Date(feedingRecords[0].time);
      const hoursSinceFeeding = (now.getTime() - lastFeeding.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceFeeding >= profile.preferences.feedingInterval) {
        const existingReminder = reminders.find(r => r.type === 'feeding' && !r.dismissed);
        if (!existingReminder) {
          createReminder(
            'feeding',
            `Hora de alimentar ${profile.name}! Já se passaram ${Math.floor(hoursSinceFeeding)} horas desde a última mamada.`,
            'high'
          );
        }
      }
    } else {
      // Primeira mamada do dia
      const existingReminder = reminders.find(r => r.type === 'feeding' && !r.dismissed);
      if (!existingReminder) {
        createReminder(
          'feeding',
          `Bom dia! Que tal registrar a primeira mamada de ${profile.name}?`,
          'medium'
        );
      }
    }

    // Verificar último sono
    const activeSleep = sleepRecords.find(r => !r.endTime);
    if (!activeSleep && sleepRecords.length > 0) {
      const lastSleep = sleepRecords[0];
      if (lastSleep.endTime) {
        const lastWakeUp = new Date(lastSleep.endTime);
        const hoursSinceWakeUp = (now.getTime() - lastWakeUp.getTime()) / (1000 * 60 * 60);
        
        if (hoursSinceWakeUp >= profile.preferences.wakeUpInterval) {
          const existingReminder = reminders.find(r => r.type === 'sleep' && !r.dismissed);
          if (!existingReminder) {
            createReminder(
              'sleep',
              `${profile.name} pode estar com sono. Já se passaram ${Math.floor(hoursSinceWakeUp)} horas desde que acordou.`,
              'medium'
            );
          }
        }
      }
    }

    // Lembrete de troca de fralda (a cada 3 horas)
    const existingDiaperReminder = reminders.find(r => r.type === 'diaper' && !r.dismissed);
    if (!existingDiaperReminder && feedingRecords.length > 0) {
      const lastFeeding = new Date(feedingRecords[0].time);
      const hoursSinceFeeding = (now.getTime() - lastFeeding.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceFeeding >= 3) {
        createReminder(
          'diaper',
          `Lembre-se de verificar a fralda de ${profile.name}!`,
          'low'
        );
      }
    }

    // Lembrete de banho (uma vez por dia)
    const hour = now.getHours();
    if (hour >= 17 && hour <= 19) {
      const existingBathReminder = reminders.find(r => r.type === 'bath' && !r.dismissed);
      if (!existingBathReminder) {
        createReminder(
          'bath',
          `Hora do banho de ${profile.name}! Este é um bom horário para relaxar antes de dormir.`,
          'medium'
        );
      }
    }
  };

  const createReminder = (
    type: AIReminder['type'],
    message: string,
    priority: AIReminder['priority']
  ) => {
    const reminder: AIReminder = {
      id: Date.now().toString(),
      type,
      message,
      time: new Date().toISOString(),
      priority,
      dismissed: false,
    };

    saveReminder(reminder);
    setReminders(prev => [reminder, ...prev]);
    
    // Mostrar notificação toast
    toast.info(message, {
      duration: 5000,
      action: {
        label: 'OK',
        onClick: () => handleDismiss(reminder.id),
      },
    });
  };

  const handleDismiss = (id: string) => {
    dismissReminder(id);
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const getIcon = (type: AIReminder['type']) => {
    switch (type) {
      case 'feeding':
        return <Milk className="w-5 h-5" />;
      case 'sleep':
        return <Moon className="w-5 h-5" />;
      case 'diaper':
        return <Droplets className="w-5 h-5" />;
      case 'bath':
        return <Bath className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: AIReminder['priority']) => {
    switch (priority) {
      case 'high':
        return 'from-red-500 to-orange-600';
      case 'medium':
        return 'from-blue-500 to-purple-600';
      case 'low':
        return 'from-gray-400 to-gray-600';
    }
  };

  if (reminders.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <Bell className="w-4 h-4" />
        <span>Lembretes Inteligentes</span>
      </div>
      
      {reminders.map((reminder) => (
        <Card
          key={reminder.id}
          className="border-l-4 shadow-lg animate-in slide-in-from-top duration-500"
          style={{
            borderLeftColor: reminder.priority === 'high' ? '#ef4444' : reminder.priority === 'medium' ? '#8b5cf6' : '#9ca3af'
          }}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${getPriorityColor(reminder.priority)} text-white flex-shrink-0`}>
                {getIcon(reminder.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 leading-relaxed">
                  {reminder.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(reminder.time).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDismiss(reminder.id)}
                className="flex-shrink-0 h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
