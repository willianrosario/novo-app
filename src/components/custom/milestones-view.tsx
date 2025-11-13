'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils, Baby, Moon, CheckCircle2, Clock } from 'lucide-react';
import { MILESTONES } from '@/lib/types';

interface MilestonesViewProps {
  babyAgeMonths: number;
}

export function MilestonesView({ babyAgeMonths }: MilestonesViewProps) {
  const feedingMilestones = MILESTONES.filter(m => m.category === 'feeding');

  return (
    <div className="space-y-6">
      <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <Baby className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Marcos de Desenvolvimento</CardTitle>
              <CardDescription className="text-base">
                Idade atual: {babyAgeMonths} {babyAgeMonths === 1 ? 'mês' : 'meses'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Utensils className="w-5 h-5 text-purple-600" />
          Alimentação por Idade
        </h3>
        
        <div className="grid gap-4 sm:grid-cols-2">
          {feedingMilestones.map((milestone) => {
            const isPast = babyAgeMonths > milestone.ageMonths;
            const isCurrent = babyAgeMonths >= milestone.ageMonths && 
                             (feedingMilestones.find(m => m.ageMonths > milestone.ageMonths)?.ageMonths || Infinity) > babyAgeMonths;
            const isFuture = babyAgeMonths < milestone.ageMonths;

            return (
              <Card 
                key={milestone.ageMonths}
                className={`transition-all duration-300 ${
                  isCurrent 
                    ? 'border-2 border-purple-500 shadow-lg bg-purple-50' 
                    : isPast 
                    ? 'bg-gray-50 opacity-75' 
                    : 'bg-white'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {isPast && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                        {isCurrent && <Clock className="w-5 h-5 text-purple-600 animate-pulse" />}
                        <CardTitle className="text-lg">{milestone.title}</CardTitle>
                      </div>
                      <Badge 
                        variant={isCurrent ? "default" : "secondary"}
                        className={isCurrent ? "bg-purple-600" : ""}
                      >
                        {milestone.ageMonths} {milestone.ageMonths === 1 ? 'mês' : 'meses'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm ${isCurrent ? 'text-purple-900 font-medium' : 'text-gray-700'}`}>
                    {milestone.description}
                  </p>
                  {isCurrent && (
                    <div className="mt-3 p-3 bg-purple-100 rounded-lg">
                      <p className="text-xs font-semibold text-purple-900">
                        ✨ Fase atual do seu bebê!
                      </p>
                    </div>
                  )}
                  {isPast && (
                    <div className="mt-3 p-2 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-700">
                        ✓ Fase concluída
                      </p>
                    </div>
                  )}
                  {isFuture && (
                    <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700">
                        → Em breve
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            💡 Dicas Importantes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <span className="text-2xl">🍼</span>
            <div>
              <p className="font-semibold text-sm">Introdução alimentar</p>
              <p className="text-sm text-gray-700">
                Sempre consulte o pediatra antes de introduzir novos alimentos
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">⏰</span>
            <div>
              <p className="font-semibold text-sm">Rotina é importante</p>
              <p className="text-sm text-gray-700">
                Mantenha horários regulares para alimentação e sono
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">📝</span>
            <div>
              <p className="font-semibold text-sm">Registre tudo</p>
              <p className="text-sm text-gray-700">
                Use este app para acompanhar padrões e compartilhar com o pediatra
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
