'use client';

import { useState, useEffect } from 'react';
import { Questionnaire } from '@/components/custom/questionnaire';
import { Dashboard } from '@/components/custom/dashboard';
import { getProfile, saveProfile, clearAllData } from '@/lib/storage';
import type { BabyProfile } from '@/lib/types';
import { Toaster } from 'sonner';

export default function Home() {
  const [profile, setProfile] = useState<BabyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carregar perfil do localStorage
    const savedProfile = getProfile();
    setProfile(savedProfile);
    setIsLoading(false);
  }, []);

  const handleQuestionnaireComplete = (newProfile: BabyProfile) => {
    saveProfile(newProfile);
    setProfile(newProfile);
  };

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair? Todos os dados serão mantidos.')) {
      setProfile(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!profile ? (
        <Questionnaire onComplete={handleQuestionnaireComplete} />
      ) : (
        <Dashboard profile={profile} onLogout={handleLogout} />
      )}
      <Toaster position="top-center" richColors />
    </>
  );
}
