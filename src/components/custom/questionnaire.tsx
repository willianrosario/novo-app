'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Baby, ArrowRight, ArrowLeft } from 'lucide-react';
import type { BabyProfile, BabyPreferences } from '@/lib/types';

interface QuestionnaireProps {
  onComplete: (profile: BabyProfile) => void;
}

export function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Dados básicos
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');

  // Preferências de alimentação
  const [feedingType, setFeedingType] = useState<'breast' | 'bottle' | 'both'>('breast');
  const [feedingInterval, setFeedingInterval] = useState('3');

  // Preferências de sono
  const [sleepPattern, setSleepPattern] = useState<'light' | 'normal' | 'heavy'>('normal');
  const [wakeUpInterval, setWakeUpInterval] = useState('2');

  // Comportamento
  const [usesPacifier, setUsesPacifier] = useState('no');
  const [criesOften, setCriesOften] = useState('no');
  const [temperatureSensitivity, setTemperatureSensitivity] = useState<'low' | 'normal' | 'high'>('normal');

  const handleNext = () => {
    if (step === 1 && (!name || !birthDate)) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const preferences: BabyPreferences = {
      feedingType,
      feedingInterval: parseInt(feedingInterval),
      sleepPattern,
      wakeUpInterval: parseInt(wakeUpInterval),
      usesPacifier: usesPacifier === 'yes',
      criesOften: criesOften === 'yes',
      temperatureSensitivity,
    };

    const profile: BabyProfile = {
      name,
      birthDate,
      gender,
      createdAt: new Date().toISOString(),
      preferences,
    };

    onComplete(profile);
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Baby className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Questionário Inicial
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Etapa {step} de {totalSteps} - Vamos conhecer melhor seu bebê
          </CardDescription>
          <Progress value={progress} className="h-2" />
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Etapa 1: Dados Básicos */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-semibold">
                  Nome do bebê *
                </Label>
                <Input
                  id="name"
                  placeholder="Ex: Maria, João..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-base font-semibold">
                  Data de nascimento *
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="h-12 text-base"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">Sexo</Label>
                <RadioGroup value={gender} onValueChange={(value) => setGender(value as any)}>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer flex-1 text-base">
                      Menino
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer flex-1 text-base">
                      Menina
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer flex-1 text-base">
                      Prefiro não informar
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Etapa 2: Alimentação */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="space-y-3">
                <Label className="text-base font-semibold">Como o bebê se alimenta?</Label>
                <RadioGroup value={feedingType} onValueChange={(value) => setFeedingType(value as any)}>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-purple-300 transition-colors">
                    <RadioGroupItem value="breast" id="breast" />
                    <Label htmlFor="breast" className="cursor-pointer flex-1">
                      <div className="font-semibold">Peito</div>
                      <div className="text-sm text-gray-600">Apenas amamentação</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-purple-300 transition-colors">
                    <RadioGroupItem value="bottle" id="bottle" />
                    <Label htmlFor="bottle" className="cursor-pointer flex-1">
                      <div className="font-semibold">Mamadeira</div>
                      <div className="text-sm text-gray-600">Apenas fórmula</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-purple-300 transition-colors">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both" className="cursor-pointer flex-1">
                      <div className="font-semibold">Ambos</div>
                      <div className="text-sm text-gray-600">Peito e mamadeira</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedingInterval" className="text-base font-semibold">
                  A cada quantas horas o bebê mama normalmente?
                </Label>
                <Input
                  id="feedingInterval"
                  type="number"
                  min="1"
                  max="8"
                  value={feedingInterval}
                  onChange={(e) => setFeedingInterval(e.target.value)}
                  className="h-12 text-base"
                />
                <p className="text-sm text-gray-600">Usaremos isso para lembrá-la na hora certa</p>
              </div>
            </div>
          )}

          {/* Etapa 3: Sono e Comportamento */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="space-y-3">
                <Label className="text-base font-semibold">Como é o sono do bebê?</Label>
                <RadioGroup value={sleepPattern} onValueChange={(value) => setSleepPattern(value as any)}>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-purple-300 transition-colors">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="cursor-pointer flex-1">
                      <div className="font-semibold">Sono leve</div>
                      <div className="text-sm text-gray-600">Acorda com facilidade</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-purple-300 transition-colors">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal" className="cursor-pointer flex-1">
                      <div className="font-semibold">Sono normal</div>
                      <div className="text-sm text-gray-600">Acorda algumas vezes</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-purple-300 transition-colors">
                    <RadioGroupItem value="heavy" id="heavy" />
                    <Label htmlFor="heavy" className="cursor-pointer flex-1">
                      <div className="font-semibold">Sono pesado</div>
                      <div className="text-sm text-gray-600">Dorme profundamente</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wakeUpInterval" className="text-base font-semibold">
                  A cada quantas horas o bebê acorda normalmente?
                </Label>
                <Input
                  id="wakeUpInterval"
                  type="number"
                  min="1"
                  max="12"
                  value={wakeUpInterval}
                  onChange={(e) => setWakeUpInterval(e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">O bebê usa chupeta?</Label>
                <RadioGroup value={usesPacifier} onValueChange={setUsesPacifier}>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="yes" id="pacifier-yes" />
                    <Label htmlFor="pacifier-yes" className="cursor-pointer flex-1">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="no" id="pacifier-no" />
                    <Label htmlFor="pacifier-no" className="cursor-pointer flex-1">Não</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">O bebê chora com frequência?</Label>
                <RadioGroup value={criesOften} onValueChange={setCriesOften}>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="yes" id="cries-yes" />
                    <Label htmlFor="cries-yes" className="cursor-pointer flex-1">Sim, chora bastante</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="no" id="cries-no" />
                    <Label htmlFor="cries-no" className="cursor-pointer flex-1">Não, é tranquilo</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Etapa 4: Conforto */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="space-y-3">
                <Label className="text-base font-semibold">Como o bebê reage à temperatura?</Label>
                <RadioGroup value={temperatureSensitivity} onValueChange={(value) => setTemperatureSensitivity(value as any)}>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-purple-300 transition-colors">
                    <RadioGroupItem value="low" id="temp-low" />
                    <Label htmlFor="temp-low" className="cursor-pointer flex-1">
                      <div className="font-semibold">Pouco sensível</div>
                      <div className="text-sm text-gray-600">Raramente sente frio ou calor</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-purple-300 transition-colors">
                    <RadioGroupItem value="normal" id="temp-normal" />
                    <Label htmlFor="temp-normal" className="cursor-pointer flex-1">
                      <div className="font-semibold">Sensibilidade normal</div>
                      <div className="text-sm text-gray-600">Reage normalmente</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-purple-300 transition-colors">
                    <RadioGroupItem value="high" id="temp-high" />
                    <Label htmlFor="temp-high" className="cursor-pointer flex-1">
                      <div className="font-semibold">Muito sensível</div>
                      <div className="text-sm text-gray-600">Sente frio ou calor facilmente</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Pronto!</strong> Com essas informações, vamos criar lembretes personalizados para você. 
                  O app vai aprender com seus registros e sugerir os melhores horários para cada atividade.
                </p>
              </div>
            </div>
          )}

          {/* Botões de navegação */}
          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-12 gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            )}
            {step < totalSteps ? (
              <Button
                type="button"
                onClick={handleNext}
                className="flex-1 h-12 gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Próximo
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                className="flex-1 h-12 gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                Começar a usar
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
