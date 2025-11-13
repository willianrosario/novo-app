'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Milk, Moon, Thermometer, Heart, Wind, Droplet } from 'lucide-react';
import { useState } from 'react';

interface CryReason {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  signs: string[];
  solutions: string[];
  color: string;
}

const CRY_REASONS: CryReason[] = [
  {
    id: 'hunger',
    icon: <Milk className="w-6 h-6" />,
    title: 'Fome',
    description: 'O bebê está com fome e precisa mamar',
    signs: [
      'Leva as mãos à boca',
      'Faz movimentos de sucção',
      'Vira a cabeça procurando o peito',
      'Choro rítmico e insistente'
    ],
    solutions: [
      'Ofereça o peito ou mamadeira',
      'Verifique se está na hora da mamada',
      'Certifique-se de que está pegando bem',
      'Observe se está satisfeito após mamar'
    ],
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'sleep',
    icon: <Moon className="w-6 h-6" />,
    title: 'Sono',
    description: 'O bebê está cansado e precisa dormir',
    signs: [
      'Esfrega os olhos',
      'Boceja frequentemente',
      'Fica irritado facilmente',
      'Choro manhoso e contínuo'
    ],
    solutions: [
      'Leve para um ambiente calmo e escuro',
      'Embale suavemente',
      'Use sons brancos ou música suave',
      'Mantenha rotina de sono'
    ],
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'diaper',
    icon: <Droplet className="w-6 h-6" />,
    title: 'Fralda Suja',
    description: 'A fralda está molhada ou suja',
    signs: [
      'Choro súbito',
      'Desconforto visível',
      'Fralda pesada ou com odor',
      'Irritação na pele'
    ],
    solutions: [
      'Verifique e troque a fralda',
      'Limpe bem a área',
      'Use creme preventivo',
      'Deixe a pele respirar um pouco'
    ],
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'colic',
    icon: <Wind className="w-6 h-6" />,
    title: 'Cólica ou Gases',
    description: 'O bebê está com desconforto abdominal',
    signs: [
      'Choro intenso e prolongado',
      'Encolhe as pernas',
      'Barriga dura ou inchada',
      'Rosto vermelho de esforço'
    ],
    solutions: [
      'Massagem na barriga (sentido horário)',
      'Posição de "aviãozinho"',
      'Compressa morna na barriga',
      'Movimentos de bicicleta com as pernas'
    ],
    color: 'from-orange-500 to-amber-600'
  },
  {
    id: 'temperature',
    icon: <Thermometer className="w-6 h-6" />,
    title: 'Temperatura',
    description: 'O bebê está com frio ou calor',
    signs: [
      'Mãos e pés frios (frio)',
      'Suor excessivo (calor)',
      'Pele avermelhada (calor)',
      'Tremores (frio)'
    ],
    solutions: [
      'Ajuste as roupas do bebê',
      'Verifique temperatura do ambiente',
      'Use camadas de roupa',
      'Mantenha ambiente entre 20-22°C'
    ],
    color: 'from-red-500 to-orange-600'
  },
  {
    id: 'affection',
    icon: <Heart className="w-6 h-6" />,
    title: 'Carinho e Atenção',
    description: 'O bebê precisa de contato e afeto',
    signs: [
      'Choro que acalma no colo',
      'Busca contato visual',
      'Acalma com voz dos pais',
      'Choro intermitente'
    ],
    solutions: [
      'Pegue no colo e embale',
      'Converse com voz suave',
      'Faça contato pele a pele',
      'Cante ou sussurre'
    ],
    color: 'from-pink-500 to-purple-600'
  }
];

export function CryHelper() {
  const [selectedReason, setSelectedReason] = useState<CryReason | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-lg border-2 border-orange-200">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            <CardTitle>Entendendo o Choro</CardTitle>
          </div>
          <CardDescription className="text-orange-100">
            Descubra o que seu bebê pode estar tentando comunicar
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-gray-700 mb-4">
            O choro é a principal forma de comunicação do bebê. Clique em cada opção para entender os sinais e soluções:
          </p>
        </CardContent>
      </Card>

      {/* Grid de Razões */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CRY_REASONS.map((reason) => (
          <Card
            key={reason.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
              selectedReason?.id === reason.id ? 'ring-2 ring-blue-500 shadow-xl' : 'shadow-md'
            }`}
            onClick={() => setSelectedReason(selectedReason?.id === reason.id ? null : reason)}
          >
            <CardHeader className={`bg-gradient-to-r ${reason.color} text-white rounded-t-lg`}>
              <div className="flex items-center gap-2">
                {reason.icon}
                <CardTitle className="text-lg">{reason.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-700">{reason.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detalhes da Razão Selecionada */}
      {selectedReason && (
        <Card className="shadow-xl border-2 border-blue-300 animate-in slide-in-from-bottom duration-300">
          <CardHeader className={`bg-gradient-to-r ${selectedReason.color} text-white rounded-t-lg`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedReason.icon}
                <CardTitle>{selectedReason.title}</CardTitle>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedReason(null)}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                Fechar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Sinais */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">👀</span>
                Sinais para Identificar
              </h3>
              <ul className="space-y-2">
                {selectedReason.signs.map((sign, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Soluções */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-green-600">✓</span>
                O Que Fazer
              </h3>
              <ul className="space-y-2">
                {selectedReason.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-600 mt-1">→</span>
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dica Importante */}
      <Card className="shadow-md bg-yellow-50 border-yellow-200">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">
                Importante: Quando Procurar Ajuda Médica
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Choro inconsolável por mais de 2 horas</li>
                <li>• Febre acima de 38°C</li>
                <li>• Vômitos frequentes ou diarreia</li>
                <li>• Bebê muito quieto ou letárgico</li>
                <li>• Dificuldade para respirar</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
