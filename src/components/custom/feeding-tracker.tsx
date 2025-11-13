'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { saveFeedingRecord } from '@/lib/storage';
import type { FeedingRecord } from '@/lib/types';
import { toast } from 'sonner';

export function FeedingTracker() {
  const [type, setType] = useState<'breast' | 'bottle' | 'solid'>('breast');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const record: FeedingRecord = {
      id: Date.now().toString(),
      time: new Date().toISOString(),
      type,
      amount: amount ? parseInt(amount) : undefined,
      duration: duration ? parseInt(duration) : undefined,
      notes: notes || undefined,
      createdAt: new Date().toISOString(),
    };

    saveFeedingRecord(record);
    
    // Reset form
    setAmount('');
    setDuration('');
    setNotes('');
    
    toast.success('Alimentação registrada!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Tipo de alimentação</Label>
        <RadioGroup value={type} onValueChange={(v) => setType(v as any)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="breast" id="breast" />
            <Label htmlFor="breast" className="cursor-pointer">Amamentação</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bottle" id="bottle" />
            <Label htmlFor="bottle" className="cursor-pointer">Mamadeira</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="solid" id="solid" />
            <Label htmlFor="solid" className="cursor-pointer">Papinha/Sólidos</Label>
          </div>
        </RadioGroup>
      </div>

      {type === 'bottle' && (
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm font-semibold">Quantidade (ml)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Ex: 120"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
          />
        </div>
      )}

      {type === 'breast' && (
        <div className="space-y-2">
          <Label htmlFor="duration" className="text-sm font-semibold">Duração (minutos)</Label>
          <Input
            id="duration"
            type="number"
            placeholder="Ex: 15"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="0"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="feeding-notes" className="text-sm font-semibold">Observações (opcional)</Label>
        <Input
          id="feeding-notes"
          placeholder="Ex: aceitou bem, rejeitou..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <Button 
        type="submit"
        className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
      >
        Registrar alimentação
      </Button>
    </form>
  );
}
