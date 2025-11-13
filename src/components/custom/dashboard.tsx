'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Baby, Moon, Milk, Bath, Thermometer, Calendar, TrendingUp, LogOut, BookOpen, HelpCircle, Apple, Syringe, Sun } from 'lucide-react';
import type { BabyProfile } from '@/lib/types';
import { SleepTracker } from './sleep-tracker';
import { FeedingTracker } from './feeding-tracker';
import { BathTracker } from './bath-tracker';
import { ComfortTracker } from './comfort-tracker';
import { HistoryView } from './history-view';
import { MilestonesView } from './milestones-view';
import { AIReminders } from './ai-reminders';
import { DevelopmentGuide } from './development-guide';
import { CryHelper } from './cry-helper';
import { NutritionGuide } from './nutrition-guide';
import { VaccinationTracker } from './vaccination-tracker';

interface DashboardProps {
  profile: BabyProfile;
  onLogout: () => void;
}

export function Dashboard({ profile, onLogout }: DashboardProps) {
  const [babyAge, setBabyAge] = useState({ months: 0, days: 0 });
  const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    const calculateAge = () => {
      const birth = new Date(profile.birthDate);
      const today = new Date();
      
      let months = (today.getFullYear() - birth.getFullYear()) * 12;
      months -= birth.getMonth();
      months += today.getMonth();
      
      const days = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)) % 30;
      
      setBabyAge({ months: Math.max(0, months), days });
    };

    calculateAge();
  }, [profile.birthDate]);

  useEffect(() => {
    const saved = localStorage.getItem('night_mode');
    if (saved) {
      setNightMode(JSON.parse(saved));
    }
  }, []);

  const toggleNightMode = () => {
    const newMode = !nightMode;
    setNightMode(newMode);
    localStorage.setItem('night_mode', JSON.stringify(newMode));
  };

  const bgClass = nightMode 
    ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900' 
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';

  const headerBgClass = nightMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-b';
  const textClass = nightMode ? 'text-gray-100' : 'text-gray-900';
  const subtextClass = nightMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${headerBgClass} shadow-sm sticky top-0 z-50 transition-colors duration-300`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl sm:text-2xl font-bold ${textClass}`}>{profile.name}</h1>
                <p className={`text-sm ${subtextClass}`}>
                  {babyAge.months} {babyAge.months === 1 ? 'mês' : 'meses'} e {babyAge.days} {babyAge.days === 1 ? 'dia' : 'dias'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleNightMode}
                className="gap-2"
              >
                {nightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span className="hidden sm:inline">{nightMode ? 'Modo Dia' : 'Modo Noite'}</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* AI Reminders Section */}
        <div className="mb-6">
          <AIReminders profile={profile} />
        </div>

        <Tabs defaultValue="track" className="space-y-6">
          <TabsList className={`grid w-full grid-cols-6 h-auto p-1 shadow-sm ${nightMode ? 'bg-gray-800' : 'bg-white'}`}>
            <TabsTrigger value="track" className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white ${nightMode ? 'text-gray-300' : ''}`}>
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Registrar</span>
            </TabsTrigger>
            <TabsTrigger value="history" className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white ${nightMode ? 'text-gray-300' : ''}`}>
              <Calendar className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Histórico</span>
            </TabsTrigger>
            <TabsTrigger value="development" className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white ${nightMode ? 'text-gray-300' : ''}`}>
              <BookOpen className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Guia</span>
            </TabsTrigger>
            <TabsTrigger value="cry" className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white ${nightMode ? 'text-gray-300' : ''}`}>
              <HelpCircle className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Choro</span>
            </TabsTrigger>
            <TabsTrigger value="nutrition" className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white ${nightMode ? 'text-gray-300' : ''}`}>
              <Apple className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Nutrição</span>
            </TabsTrigger>
            <TabsTrigger value="vaccines" className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white ${nightMode ? 'text-gray-300' : ''}`}>
              <Syringe className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Vacinas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="track" className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
                  <div className="flex items-center gap-2">
                    <Moon className="w-5 h-5" />
                    <CardTitle>Sono</CardTitle>
                  </div>
                  <CardDescription className="text-indigo-100">
                    Registre os períodos de sono e qualidade
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <SleepTracker />
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-t-lg">
                  <div className="flex items-center gap-2">
                    <Milk className="w-5 h-5" />
                    <CardTitle>Alimentação</CardTitle>
                  </div>
                  <CardDescription className="text-pink-100">
                    Registre mamadas e refeições
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <FeedingTracker />
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-lg">
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5" />
                    <CardTitle>Banho</CardTitle>
                  </div>
                  <CardDescription className="text-cyan-100">
                    Registre os horários dos banhos
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <BathTracker />
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5" />
                    <CardTitle>Conforto</CardTitle>
                  </div>
                  <CardDescription className="text-orange-100">
                    Registre temperatura e conforto
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ComfortTracker />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <HistoryView />
          </TabsContent>

          <TabsContent value="development">
            <DevelopmentGuide babyAgeMonths={babyAge.months} />
          </TabsContent>

          <TabsContent value="cry">
            <CryHelper />
          </TabsContent>

          <TabsContent value="nutrition">
            <NutritionGuide babyAgeMonths={babyAge.months} />
          </TabsContent>

          <TabsContent value="vaccines">
            <VaccinationTracker babyAgeMonths={babyAge.months} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
