'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { saveComfortRecord } from '@/lib/storage';
import type { ComfortRecord } from '@/lib/types';
import { toast } from 'sonner';

export function ComfortTracker() {
  const [temperature, setTemperature] = useState<'cold' | 'comfortable' | 'hot'>('comfortable');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const record: ComfortRecord = {
      id: Date.now().toString(),
      time: new Date().toISOString(),
      temperature,
      notes: notes || undefined,
      createdAt: new Date().toISOString(),
    };

    saveComfortRecord(record);
    
    // Reset form
    setNotes('');
    setTemperature('comfortable');
    
    toast.success('Conforto registrado!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Como o bebê está?</Label>
        <RadioGroup value={temperature} onValueChange={(v) => setTemperature(v as any)}>
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-50 transition-colors">
            <RadioGroupItem value="cold" id="cold" />
            <Label htmlFor="cold" className="cursor-pointer flex-1">
              ❄️ Com frio
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-green-50 transition-colors">
            <RadioGroupItem value="comfortable" id="comfortable" />
            <Label htmlFor="comfortable" className="cursor-pointer flex-1">
              😊 Confortável
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-red-50 transition-colors">
            <RadioGroupItem value="hot" id="hot" />
            <Label htmlFor="hot" className="cursor-pointer flex-1">
              🔥 Com calor
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comfort-notes" className="text-sm font-semibold">Observações (opcional)</Label>
        <Input
          id="comfort-notes"
          placeholder="Ex: mãos frias, suando..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <Button 
        type="submit"
        className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
      >
        Registrar conforto
      </Button>
    </form>
  );
}
