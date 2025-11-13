'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Baby, Brain, Heart, Eye, Hand, MessageCircle } from 'lucide-react';

interface DevelopmentGuideProps {
  babyAgeMonths: number;
}

interface DevelopmentPhase {
  months: number;
  title: string;
  physical: string[];
  cognitive: string[];
  social: string[];
  tips: string[];
}

const DEVELOPMENT_PHASES: DevelopmentPhase[] = [
  {
    months: 0,
    title: 'Recém-nascido (0-1 mês)',
    physical: [
      'Movimentos reflexos (sucção, preensão)',
      'Dorme 16-18 horas por dia',
      'Enxerga até 20-30cm de distância',
      'Reconhece a voz da mãe'
    ],
    cognitive: [
      'Responde a sons altos',
      'Foca em rostos próximos',
      'Começa a reconhecer cheiros'
    ],
    social: [
      'Chora para comunicar necessidades',
      'Acalma-se com colo e voz familiar',
      'Contato visual breve'
    ],
    tips: [
      'Mantenha contato pele a pele',
      'Converse e cante para o bebê',
      'Respeite o ritmo de sono',
      'Amamente sob demanda'
    ]
  },
  {
    months: 1,
    title: '1-2 meses',
    physical: [
      'Levanta a cabeça brevemente',
      'Abre e fecha as mãos',
      'Segue objetos com os olhos',
      'Sorri reflexivamente'
    ],
    cognitive: [
      'Reconhece rostos familiares',
      'Responde a estímulos visuais',
      'Começa a vocalizar (arrulhos)'
    ],
    social: [
      'Primeiro sorriso social',
      'Acalma-se com voz dos pais',
      'Mantém contato visual mais longo'
    ],
    tips: [
      'Estimule com brinquedos coloridos',
      'Converse olhando nos olhos',
      'Faça massagens suaves',
      'Crie rotina de sono'
    ]
  },
  {
    months: 2,
    title: '2-3 meses',
    physical: [
      'Sustenta a cabeça melhor',
      'Chuta e estica as pernas',
      'Abre as mãos com mais frequência',
      'Coordena movimentos dos olhos'
    ],
    cognitive: [
      'Reconhece objetos familiares',
      'Responde a sons com movimentos',
      'Demonstra curiosidade'
    ],
    social: [
      'Sorri com frequência',
      'Vocaliza em resposta',
      'Gosta de interação social'
    ],
    tips: [
      'Tempo de barriga (tummy time)',
      'Leia livros com imagens',
      'Cante canções de ninar',
      'Brinque de esconde-esconde'
    ]
  },
  {
    months: 3,
    title: '3-4 meses',
    physical: [
      'Rola de barriga para lado',
      'Alcança e agarra objetos',
      'Leva objetos à boca',
      'Sustenta cabeça firmemente'
    ],
    cognitive: [
      'Reconhece pessoas à distância',
      'Responde ao próprio nome',
      'Explora com as mãos e boca'
    ],
    social: [
      'Ri alto',
      'Imita expressões faciais',
      'Gosta de brincadeiras',
      'Demonstra emoções'
    ],
    tips: [
      'Ofereça brinquedos seguros',
      'Estimule alcançar objetos',
      'Converse descrevendo ações',
      'Mantenha ambiente seguro'
    ]
  },
  {
    months: 4,
    title: '4-6 meses',
    physical: [
      'Rola completamente',
      'Senta com apoio',
      'Transfere objetos entre mãos',
      'Pode começar a engatinhar'
    ],
    cognitive: [
      'Reconhece emoções',
      'Responde ao próprio nome',
      'Explora causa e efeito',
      'Memória de curto prazo'
    ],
    social: [
      'Ansiedade com estranhos',
      'Prefere pessoas familiares',
      'Expressa alegria e frustração',
      'Imita sons'
    ],
    tips: [
      'Introdução alimentar (consulte pediatra)',
      'Brinquedos de encaixe',
      'Espelho seguro para bebês',
      'Música e movimento'
    ]
  },
  {
    months: 6,
    title: '6-9 meses',
    physical: [
      'Senta sem apoio',
      'Engatinha ou arrasta',
      'Fica em pé com apoio',
      'Pega objetos pequenos (pinça)'
    ],
    cognitive: [
      'Entende "não"',
      'Procura objetos escondidos',
      'Explora tudo com as mãos',
      'Reconhece nomes de objetos'
    ],
    social: [
      'Ansiedade de separação',
      'Brinca de esconde-esconde',
      'Imita gestos',
      'Demonstra preferências'
    ],
    tips: [
      'Ambiente seguro para explorar',
      'Brinquedos educativos',
      'Leia todos os dias',
      'Estimule engatinhar'
    ]
  },
  {
    months: 9,
    title: '9-12 meses',
    physical: [
      'Fica em pé sozinho',
      'Pode dar primeiros passos',
      'Aponta com o dedo',
      'Bate palmas'
    ],
    cognitive: [
      'Entende comandos simples',
      'Resolve problemas simples',
      'Imita ações',
      'Reconhece partes do corpo'
    ],
    social: [
      'Diz primeiras palavras',
      'Acena tchau',
      'Mostra afeto',
      'Testa limites'
    ],
    tips: [
      'Estimule primeiros passos',
      'Converse constantemente',
      'Estabeleça limites gentis',
      'Celebre conquistas'
    ]
  },
  {
    months: 12,
    title: '12+ meses',
    physical: [
      'Anda sozinho',
      'Sobe escadas engatinhando',
      'Usa colher',
      'Empilha blocos'
    ],
    cognitive: [
      'Vocabulário crescente',
      'Segue instruções de 2 passos',
      'Reconhece figuras em livros',
      'Brinca de faz de conta'
    ],
    social: [
      'Mais independente',
      'Birras ocasionais',
      'Brinca perto de outras crianças',
      'Expressa muitas emoções'
    ],
    tips: [
      'Estimule linguagem',
      'Brinquedos de empurrar/puxar',
      'Rotina consistente',
      'Paciência com birras'
    ]
  }
];

export function DevelopmentGuide({ babyAgeMonths }: DevelopmentGuideProps) {
  const currentPhase = DEVELOPMENT_PHASES.find(
    phase => babyAgeMonths >= phase.months && babyAgeMonths < (phase.months + 3)
  ) || DEVELOPMENT_PHASES[0];

  const nextPhase = DEVELOPMENT_PHASES.find(
    phase => phase.months > currentPhase.months
  );

  return (
    <div className="space-y-6">
      {/* Fase Atual */}
      <Card className="shadow-lg border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Baby className="w-6 h-6" />
              <CardTitle>Fase Atual</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-white text-blue-600">
              {babyAgeMonths} {babyAgeMonths === 1 ? 'mês' : 'meses'}
            </Badge>
          </div>
          <CardDescription className="text-blue-100 font-semibold text-lg mt-2">
            {currentPhase.title}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Desenvolvimento Físico */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Hand className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Desenvolvimento Físico</h3>
            </div>
            <ul className="space-y-2">
              {currentPhase.physical.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Desenvolvimento Cognitivo */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Desenvolvimento Cognitivo</h3>
            </div>
            <ul className="space-y-2">
              {currentPhase.cognitive.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Desenvolvimento Social */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-pink-600" />
              <h3 className="font-semibold text-gray-900">Desenvolvimento Social</h3>
            </div>
            <ul className="space-y-2">
              {currentPhase.social.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dicas para os Pais */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Dicas para Estimular</h3>
            </div>
            <ul className="space-y-2">
              {currentPhase.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Próxima Fase */}
      {nextPhase && (
        <Card className="shadow-md">
          <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-gray-600" />
              <CardTitle className="text-gray-900">Próxima Fase</CardTitle>
            </div>
            <CardDescription className="text-gray-700 font-semibold">
              {nextPhase.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-3">
              Em breve seu bebê começará a:
            </p>
            <ul className="space-y-2">
              {nextPhase.physical.slice(0, 3).map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-gray-400 mt-1">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
