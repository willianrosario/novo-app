'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Syringe, Calendar, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Vaccine {
  id: string;
  name: string;
  ageMonths: number;
  ageLabel: string;
  description: string;
  doses: number;
  diseases: string[];
}

interface VaccinationRecord {
  vaccineId: string;
  date: string;
  notes?: string;
}

const VACCINATION_SCHEDULE: Vaccine[] = [
  {
    id: 'bcg',
    name: 'BCG',
    ageMonths: 0,
    ageLabel: 'Ao nascer',
    description: 'Vacina contra tuberculose',
    doses: 1,
    diseases: ['Tuberculose']
  },
  {
    id: 'hepatite-b-1',
    name: 'Hepatite B',
    ageMonths: 0,
    ageLabel: 'Ao nascer',
    description: 'Primeira dose contra hepatite B',
    doses: 1,
    diseases: ['Hepatite B']
  },
  {
    id: 'pentavalente-1',
    name: 'Pentavalente (1ª dose)',
    ageMonths: 2,
    ageLabel: '2 meses',
    description: 'Protege contra 5 doenças',
    doses: 1,
    diseases: ['Difteria', 'Tétano', 'Coqueluche', 'Haemophilus', 'Hepatite B']
  },
  {
    id: 'vip-1',
    name: 'VIP (1ª dose)',
    ageMonths: 2,
    ageLabel: '2 meses',
    description: 'Vacina inativada contra poliomielite',
    doses: 1,
    diseases: ['Poliomielite']
  },
  {
    id: 'pneumo-1',
    name: 'Pneumocócica (1ª dose)',
    ageMonths: 2,
    ageLabel: '2 meses',
    description: 'Protege contra pneumonia e meningite',
    doses: 1,
    diseases: ['Pneumonia', 'Meningite']
  },
  {
    id: 'rotavirus-1',
    name: 'Rotavírus (1ª dose)',
    ageMonths: 2,
    ageLabel: '2 meses',
    description: 'Protege contra diarreia por rotavírus',
    doses: 1,
    diseases: ['Diarreia por rotavírus']
  },
  {
    id: 'pentavalente-2',
    name: 'Pentavalente (2ª dose)',
    ageMonths: 4,
    ageLabel: '4 meses',
    description: 'Segunda dose da pentavalente',
    doses: 1,
    diseases: ['Difteria', 'Tétano', 'Coqueluche', 'Haemophilus', 'Hepatite B']
  },
  {
    id: 'vip-2',
    name: 'VIP (2ª dose)',
    ageMonths: 4,
    ageLabel: '4 meses',
    description: 'Segunda dose contra poliomielite',
    doses: 1,
    diseases: ['Poliomielite']
  },
  {
    id: 'pneumo-2',
    name: 'Pneumocócica (2ª dose)',
    ageMonths: 4,
    ageLabel: '4 meses',
    description: 'Segunda dose pneumocócica',
    doses: 1,
    diseases: ['Pneumonia', 'Meningite']
  },
  {
    id: 'rotavirus-2',
    name: 'Rotavírus (2ª dose)',
    ageMonths: 4,
    ageLabel: '4 meses',
    description: 'Segunda dose contra rotavírus',
    doses: 1,
    diseases: ['Diarreia por rotavírus']
  },
  {
    id: 'pentavalente-3',
    name: 'Pentavalente (3ª dose)',
    ageMonths: 6,
    ageLabel: '6 meses',
    description: 'Terceira dose da pentavalente',
    doses: 1,
    diseases: ['Difteria', 'Tétano', 'Coqueluche', 'Haemophilus', 'Hepatite B']
  },
  {
    id: 'vip-3',
    name: 'VIP (3ª dose)',
    ageMonths: 6,
    ageLabel: '6 meses',
    description: 'Terceira dose contra poliomielite',
    doses: 1,
    diseases: ['Poliomielite']
  },
  {
    id: 'meningococica-1',
    name: 'Meningocócica C (1ª dose)',
    ageMonths: 3,
    ageLabel: '3 meses',
    description: 'Protege contra meningite C',
    doses: 1,
    diseases: ['Meningite C']
  },
  {
    id: 'meningococica-2',
    name: 'Meningocócica C (2ª dose)',
    ageMonths: 5,
    ageLabel: '5 meses',
    description: 'Segunda dose meningocócica',
    doses: 1,
    diseases: ['Meningite C']
  },
  {
    id: 'febre-amarela',
    name: 'Febre Amarela',
    ageMonths: 9,
    ageLabel: '9 meses',
    description: 'Protege contra febre amarela',
    doses: 1,
    diseases: ['Febre Amarela']
  },
  {
    id: 'triplice-viral',
    name: 'Tríplice Viral',
    ageMonths: 12,
    ageLabel: '12 meses',
    description: 'Protege contra sarampo, caxumba e rubéola',
    doses: 1,
    diseases: ['Sarampo', 'Caxumba', 'Rubéola']
  },
  {
    id: 'pneumo-reforco',
    name: 'Pneumocócica (Reforço)',
    ageMonths: 12,
    ageLabel: '12 meses',
    description: 'Dose de reforço pneumocócica',
    doses: 1,
    diseases: ['Pneumonia', 'Meningite']
  },
  {
    id: 'meningococica-reforco',
    name: 'Meningocócica C (Reforço)',
    ageMonths: 12,
    ageLabel: '12 meses',
    description: 'Dose de reforço meningocócica',
    doses: 1,
    diseases: ['Meningite C']
  }
];

interface VaccinationTrackerProps {
  babyAgeMonths: number;
}

export function VaccinationTracker({ babyAgeMonths }: VaccinationTrackerProps) {
  const [records, setRecords] = useState<VaccinationRecord[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('vaccination_records');
    if (saved) {
      setRecords(JSON.parse(saved));
    }
  }, []);

  const saveRecords = (newRecords: VaccinationRecord[]) => {
    setRecords(newRecords);
    localStorage.setItem('vaccination_records', JSON.stringify(newRecords));
  };

  const markAsCompleted = (vaccineId: string) => {
    const newRecord: VaccinationRecord = {
      vaccineId,
      date: new Date().toISOString()
    };
    saveRecords([...records, newRecord]);
  };

  const isCompleted = (vaccineId: string) => {
    return records.some(r => r.vaccineId === vaccineId);
  };

  const dueVaccines = VACCINATION_SCHEDULE.filter(
    v => v.ageMonths <= babyAgeMonths && !isCompleted(v.id)
  );

  const upcomingVaccines = VACCINATION_SCHEDULE.filter(
    v => v.ageMonths > babyAgeMonths && v.ageMonths <= babyAgeMonths + 3
  );

  const completedVaccines = VACCINATION_SCHEDULE.filter(v => isCompleted(v.id));

  return (
    <div className="space-y-6">
      {/* Header com Estatísticas */}
      <Card className="shadow-lg border-2 border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Syringe className="w-6 h-6" />
            <CardTitle>Calendário de Vacinação</CardTitle>
          </div>
          <CardDescription className="text-purple-100">
            Acompanhe as vacinas do seu bebê
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{completedVaccines.length}</p>
              <p className="text-sm text-gray-600">Completas</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <AlertCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">{dueVaccines.length}</p>
              <p className="text-sm text-gray-600">Pendentes</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{upcomingVaccines.length}</p>
              <p className="text-sm text-gray-600">Próximas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vacinas Pendentes */}
      {dueVaccines.length > 0 && (
        <Card className="shadow-lg border-2 border-orange-200">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              <CardTitle>Vacinas Pendentes</CardTitle>
            </div>
            <CardDescription className="text-orange-100">
              Estas vacinas já estão no prazo
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {dueVaccines.map((vaccine) => (
              <Card key={vaccine.id} className="shadow-md border-orange-200">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{vaccine.name}</h3>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          {vaccine.ageLabel}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{vaccine.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {vaccine.diseases.map((disease, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {disease}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      onClick={() => markAsCompleted(vaccine.id)}
                      className="bg-green-600 hover:bg-green-700 flex-shrink-0"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Marcar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Próximas Vacinas */}
      {upcomingVaccines.length > 0 && (
        <Card className="shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-gray-900">Próximas Vacinas</CardTitle>
            </div>
            <CardDescription className="text-gray-700">
              Vacinas que virão em breve
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-3">
            {upcomingVaccines.map((vaccine) => (
              <div key={vaccine.id} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900">{vaccine.name}</p>
                    <Badge variant="secondary" className="bg-blue-200 text-blue-800 text-xs">
                      {vaccine.ageLabel}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{vaccine.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Vacinas Completas */}
      {completedVaccines.length > 0 && (
        <Card className="shadow-md">
          <CardHeader className="bg-gradient-to-r from-green-100 to-green-200">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <CardTitle className="text-gray-900">Vacinas Completas</CardTitle>
            </div>
            <CardDescription className="text-gray-700">
              Parabéns! Estas vacinas já foram aplicadas
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-2 sm:grid-cols-2">
              {completedVaccines.map((vaccine) => (
                <div key={vaccine.id} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{vaccine.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Informação Importante */}
      <Card className="shadow-md bg-yellow-50 border-yellow-200">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">
                Importante sobre Vacinação
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Leve a carteirinha de vacinação em todas as consultas</li>
                <li>• Respeite os intervalos mínimos entre doses</li>
                <li>• Informe o pediatra sobre reações anteriores</li>
                <li>• Vacinas atrasadas podem ser aplicadas - consulte o pediatra</li>
                <li>• Mantenha o calendário em dia para proteção completa</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
