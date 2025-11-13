'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Moon, Milk, Bath, Thermometer } from 'lucide-react';
import { getSleepRecords, getFeedingRecords, getBathRecords, getComfortRecords } from '@/lib/storage';
import type { SleepRecord, FeedingRecord, BathRecord, ComfortRecord } from '@/lib/types';

export function HistoryView() {
  const [sleepRecords, setSleepRecords] = useState<SleepRecord[]>([]);
  const [feedingRecords, setFeedingRecords] = useState<FeedingRecord[]>([]);
  const [bathRecords, setBathRecords] = useState<BathRecord[]>([]);
  const [comfortRecords, setComfortRecords] = useState<ComfortRecord[]>([]);

  useEffect(() => {
    setSleepRecords(getSleepRecords());
    setFeedingRecords(getFeedingRecords());
    setBathRecords(getBathRecords());
    setComfortRecords(getComfortRecords());
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const calculateDuration = (start: string, end?: string) => {
    if (!end) return 'Em andamento';
    const duration = new Date(end).getTime() - new Date(start).getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}min`;
  };

  const qualityLabels = {
    excellent: '⭐ Excelente',
    good: '😊 Bom',
    fair: '😐 Regular',
    poor: '😔 Ruim',
  };

  const feedingTypeLabels = {
    breast: '🤱 Amamentação',
    bottle: '🍼 Mamadeira',
    solid: '🥄 Papinha/Sólidos',
  };

  const temperatureLabels = {
    cold: '❄️ Com frio',
    comfortable: '😊 Confortável',
    hot: '🔥 Com calor',
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Histórico de Registros</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sleep" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="sleep" className="gap-2">
              <Moon className="w-4 h-4" />
              <span className="hidden sm:inline">Sono</span>
            </TabsTrigger>
            <TabsTrigger value="feeding" className="gap-2">
              <Milk className="w-4 h-4" />
              <span className="hidden sm:inline">Alimentação</span>
            </TabsTrigger>
            <TabsTrigger value="bath" className="gap-2">
              <Bath className="w-4 h-4" />
              <span className="hidden sm:inline">Banho</span>
            </TabsTrigger>
            <TabsTrigger value="comfort" className="gap-2">
              <Thermometer className="w-4 h-4" />
              <span className="hidden sm:inline">Conforto</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sleep" className="space-y-3">
            {sleepRecords.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Nenhum registro de sono ainda</p>
            ) : (
              sleepRecords.map((record) => (
                <Card key={record.id} className="bg-indigo-50 border-indigo-200">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-indigo-900">{formatDate(record.startTime)}</p>
                        <p className="text-sm text-indigo-700">
                          {formatTime(record.startTime)} - {record.endTime ? formatTime(record.endTime) : 'Em andamento'}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-indigo-600">
                        {calculateDuration(record.startTime, record.endTime)}
                      </span>
                    </div>
                    <p className="text-sm text-indigo-800">{qualityLabels[record.quality]}</p>
                    {record.notes && (
                      <p className="text-sm text-indigo-600 mt-2 italic">{record.notes}</p>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="feeding" className="space-y-3">
            {feedingRecords.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Nenhum registro de alimentação ainda</p>
            ) : (
              feedingRecords.map((record) => (
                <Card key={record.id} className="bg-pink-50 border-pink-200">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-pink-900">{formatDate(record.time)}</p>
                        <p className="text-sm text-pink-700">{formatTime(record.time)}</p>
                      </div>
                      <span className="text-sm font-medium text-pink-600">
                        {feedingTypeLabels[record.type]}
                      </span>
                    </div>
                    {record.amount && (
                      <p className="text-sm text-pink-800">Quantidade: {record.amount}ml</p>
                    )}
                    {record.duration && (
                      <p className="text-sm text-pink-800">Duração: {record.duration} minutos</p>
                    )}
                    {record.notes && (
                      <p className="text-sm text-pink-600 mt-2 italic">{record.notes}</p>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="bath" className="space-y-3">
            {bathRecords.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Nenhum registro de banho ainda</p>
            ) : (
              bathRecords.map((record) => (
                <Card key={record.id} className="bg-cyan-50 border-cyan-200">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-cyan-900">{formatDate(record.time)}</p>
                        <p className="text-sm text-cyan-700">{formatTime(record.time)}</p>
                      </div>
                      {record.temperature && (
                        <span className="text-sm font-medium text-cyan-600">
                          {record.temperature}°C
                        </span>
                      )}
                    </div>
                    {record.notes && (
                      <p className="text-sm text-cyan-600 mt-2 italic">{record.notes}</p>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="comfort" className="space-y-3">
            {comfortRecords.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Nenhum registro de conforto ainda</p>
            ) : (
              comfortRecords.map((record) => (
                <Card key={record.id} className="bg-orange-50 border-orange-200">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-orange-900">{formatDate(record.time)}</p>
                        <p className="text-sm text-orange-700">{formatTime(record.time)}</p>
                      </div>
                      <span className="text-sm font-medium text-orange-600">
                        {temperatureLabels[record.temperature]}
                      </span>
                    </div>
                    {record.notes && (
                      <p className="text-sm text-orange-600 mt-2 italic">{record.notes}</p>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
