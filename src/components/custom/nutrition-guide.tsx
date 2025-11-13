'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Milk, Apple, Utensils, AlertCircle, CheckCircle } from 'lucide-react';

interface NutritionGuideProps {
  babyAgeMonths: number;
}

interface FormulaInfo {
  ageRange: string;
  type: string;
  description: string;
  frequency: string;
  amount: string;
}

interface FoodIntroduction {
  ageMonths: number;
  title: string;
  foods: string[];
  tips: string[];
  avoid: string[];
}

const FORMULA_GUIDE: FormulaInfo[] = [
  {
    ageRange: '0-6 meses',
    type: 'Fórmula Infantil Estágio 1',
    description: 'Fórmula para recém-nascidos e lactentes',
    frequency: 'A cada 2-3 horas',
    amount: '60-120ml por mamada'
  },
  {
    ageRange: '6-12 meses',
    type: 'Fórmula Infantil Estágio 2',
    description: 'Fórmula de seguimento para bebês em introdução alimentar',
    frequency: 'A cada 3-4 horas',
    amount: '180-240ml por mamada'
  },
  {
    ageRange: '12+ meses',
    type: 'Fórmula Infantil Estágio 3',
    description: 'Fórmula de crescimento para crianças',
    frequency: '2-3 vezes ao dia',
    amount: '200-250ml por mamada'
  }
];

const FOOD_INTRODUCTION: FoodIntroduction[] = [
  {
    ageMonths: 4,
    title: 'Primeiras Papinhas (4-6 meses)',
    foods: [
      'Banana amassada',
      'Maçã cozida e amassada',
      'Pera cozida',
      'Mamão amassado',
      'Abacate amassado'
    ],
    tips: [
      'Comece com frutas bem amassadas',
      'Ofereça uma fruta nova por vez',
      'Espere 3 dias antes de introduzir novo alimento',
      'Observe reações alérgicas',
      'Mantenha o leite como principal alimento'
    ],
    avoid: [
      'Mel (risco de botulismo)',
      'Açúcar e sal',
      'Alimentos duros ou pequenos',
      'Leite de vaca integral'
    ]
  },
  {
    ageMonths: 6,
    title: 'Papinhas Salgadas (6-8 meses)',
    foods: [
      'Batata, batata-doce, mandioca',
      'Cenoura, abóbora, chuchu',
      'Brócolis, couve-flor',
      'Frango desfiado',
      'Carne moída bem cozida',
      'Feijão amassado',
      'Arroz bem cozido'
    ],
    tips: [
      'Ofereça 2 refeições salgadas por dia',
      'Combine carboidrato + proteína + legume',
      'Amasse bem os alimentos',
      'Não use temperos fortes',
      'Deixe o bebê explorar a comida'
    ],
    avoid: [
      'Embutidos e processados',
      'Frituras',
      'Alimentos muito temperados',
      'Refrigerantes e sucos industrializados'
    ]
  },
  {
    ageMonths: 8,
    title: 'Texturas Variadas (8-10 meses)',
    foods: [
      'Alimentos em pedaços pequenos',
      'Macarrão bem cozido',
      'Ovo cozido (gema e clara)',
      'Peixe desfiado',
      'Queijos suaves',
      'Iogurte natural',
      'Pão sem casca'
    ],
    tips: [
      'Introduza texturas gradualmente',
      'Deixe o bebê pegar a comida',
      'Ofereça 3 refeições principais',
      'Inclua lanches saudáveis',
      'Estimule mastigação'
    ],
    avoid: [
      'Alimentos muito duros',
      'Nozes inteiras',
      'Uvas inteiras',
      'Pipoca'
    ]
  },
  {
    ageMonths: 12,
    title: 'Alimentação da Família (12+ meses)',
    foods: [
      'Comida da família (adaptada)',
      'Frutas frescas picadas',
      'Legumes cozidos ou crus',
      'Carnes variadas',
      'Grãos integrais',
      'Laticínios',
      'Ovos preparados de várias formas'
    ],
    tips: [
      'Adapte a comida da família',
      'Mantenha refeições em horários regulares',
      'Ofereça água durante o dia',
      'Seja paciente com recusas',
      'Crie ambiente agradável para refeições'
    ],
    avoid: [
      'Alimentos muito processados',
      'Excesso de açúcar',
      'Alimentos com risco de engasgo',
      'Bebidas açucaradas'
    ]
  }
];

export function NutritionGuide({ babyAgeMonths }: NutritionGuideProps) {
  const currentFormula = FORMULA_GUIDE.find(f => {
    const [min, max] = f.ageRange.split('-').map(s => parseInt(s) || 999);
    return babyAgeMonths >= min && (max === 999 || babyAgeMonths < max);
  }) || FORMULA_GUIDE[0];

  const currentFoodPhase = FOOD_INTRODUCTION.find(
    phase => babyAgeMonths >= phase.ageMonths && babyAgeMonths < (phase.ageMonths + 4)
  );

  const nextFoodPhase = FOOD_INTRODUCTION.find(
    phase => phase.ageMonths > (currentFoodPhase?.ageMonths || 0)
  );

  return (
    <div className="space-y-6">
      {/* Guia de Fórmula */}
      <Card className="shadow-lg border-2 border-pink-200">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Milk className="w-6 h-6" />
            <CardTitle>Guia de Fórmula Infantil</CardTitle>
          </div>
          <CardDescription className="text-pink-100">
            Informações sobre fórmula adequada para a idade
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="bg-pink-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{currentFormula.type}</h3>
              <Badge variant="secondary" className="bg-pink-200 text-pink-800">
                {currentFormula.ageRange}
              </Badge>
            </div>
            <p className="text-sm text-gray-700 mb-4">{currentFormula.description}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="bg-white rounded p-3">
                <p className="text-xs text-gray-600 mb-1">Frequência</p>
                <p className="text-sm font-semibold text-gray-900">{currentFormula.frequency}</p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="text-xs text-gray-600 mb-1">Quantidade</p>
                <p className="text-sm font-semibold text-gray-900">{currentFormula.amount}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex gap-2 items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Importante</p>
                <p className="text-sm text-gray-700">
                  O leite materno é sempre a melhor opção quando possível. Consulte o pediatra antes de escolher uma fórmula.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Introdução Alimentar - Fase Atual */}
      {currentFoodPhase && (
        <Card className="shadow-lg border-2 border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Apple className="w-6 h-6" />
              <CardTitle>Introdução Alimentar</CardTitle>
            </div>
            <CardDescription className="text-green-100 font-semibold">
              {currentFoodPhase.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Alimentos Permitidos */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">Alimentos Permitidos</h3>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {currentFoodPhase.foods.map((food, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-700 bg-green-50 rounded p-2">
                    <span className="text-green-600">✓</span>
                    <span>{food}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dicas */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Dicas Importantes</h3>
              <ul className="space-y-2">
                {currentFoodPhase.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-blue-600 mt-1">→</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Alimentos a Evitar */}
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-gray-900">Evite Nesta Fase</h3>
              </div>
              <ul className="space-y-2">
                {currentFoodPhase.avoid.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-red-600 mt-1">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Próxima Fase */}
      {nextFoodPhase && (
        <Card className="shadow-md">
          <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200">
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-gray-600" />
              <CardTitle className="text-gray-900">Próxima Fase</CardTitle>
            </div>
            <CardDescription className="text-gray-700 font-semibold">
              {nextFoodPhase.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-3">
              Em breve você poderá introduzir:
            </p>
            <ul className="space-y-2">
              {nextFoodPhase.foods.slice(0, 4).map((food, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-gray-400 mt-1">→</span>
                  <span>{food}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
