'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { saveBathRecord } from '@/lib/storage';
import type { BathRecord } from '@/lib/types';
import { toast } from 'sonner';

export function BathTracker() {
  const [temperature, setTemperature] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const record: BathRecord = {
      id: Date.now().toString(),
      time: new Date().toISOString(),
      temperature: temperature ? parseFloat(temperature) : undefined,
      notes: notes || undefined,
      createdAt: new Date().toISOString(),
    };

    saveBathRecord(record);
    
    // Reset form
    setTemperature('');
    setNotes('');
    
    toast.success('Banho registrado!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="temperature" className="text-sm font-semibold">Temperatura da água (°C) - opcional</Label>
        <Input
          id="temperature"
          type="number"
          step="0.1"
          placeholder="Ex: 37"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          min="30"
          max="40"
        />
        <p className="text-xs text-gray-500">Temperatura ideal: 36-38°C</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bath-notes" className="text-sm font-semibold">Observações (opcional)</Label>
        <Input
          id="bath-notes"
          placeholder="Ex: gostou do banho, chorou..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <Button 
        type="submit"
        className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
      >
        Registrar banho
      </Button>
    </form>
  );
}
