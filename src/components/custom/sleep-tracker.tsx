'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Play, Square } from 'lucide-react';
import { saveSleepRecord, updateSleepRecord } from '@/lib/storage';
import type { SleepRecord } from '@/lib/types';
import { toast } from 'sonner';

export function SleepTracker() {
  const [isTracking, setIsTracking] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<SleepRecord | null>(null);
  const [quality, setQuality] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good');
  const [notes, setNotes] = useState('');

  const startTracking = () => {
    const record: SleepRecord = {
      id: Date.now().toString(),
      startTime: new Date().toISOString(),
      quality: 'good',
      createdAt: new Date().toISOString(),
    };
    setCurrentRecord(record);
    setIsTracking(true);
    toast.success('Monitoramento de sono iniciado');
  };

  const stopTracking = () => {
    if (!currentRecord) return;

    const updatedRecord: SleepRecord = {
      ...currentRecord,
      endTime: new Date().toISOString(),
      quality,
      notes: notes || undefined,
    };

    saveSleepRecord(updatedRecord);
    setIsTracking(false);
    setCurrentRecord(null);
    setNotes('');
    setQuality('good');
    toast.success('Sono registrado com sucesso!');
  };

  return (
    <div className="space-y-4">
      {!isTracking ? (
        <Button 
          onClick={startTracking} 
          className="w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          <Play className="w-4 h-4 mr-2" />
          Iniciar monitoramento
        </Button>
      ) : (
        <>
          <div className="bg-indigo-50 p-4 rounded-lg text-center">
            <p className="text-sm text-indigo-600 font-medium">Monitorando sono...</p>
            <p className="text-xs text-indigo-500 mt-1">
              Iniciado às {new Date(currentRecord!.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold">Qualidade do sono</Label>
            <RadioGroup value={quality} onValueChange={(v) => setQuality(v as any)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excellent" id="excellent" />
                <Label htmlFor="excellent" className="cursor-pointer">Excelente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="good" id="good" />
                <Label htmlFor="good" className="cursor-pointer">Bom</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fair" id="fair" />
                <Label htmlFor="fair" className="cursor-pointer">Regular</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="poor" id="poor" />
                <Label htmlFor="poor" className="cursor-pointer">Ruim</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-semibold">Observações (opcional)</Label>
            <Input
              id="notes"
              placeholder="Ex: acordou chorando, dormiu tranquilo..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <Button 
            onClick={stopTracking} 
            variant="destructive"
            className="w-full h-12"
          >
            <Square className="w-4 h-4 mr-2" />
            Finalizar sono
          </Button>
        </>
      )}
    </div>
  );
}
