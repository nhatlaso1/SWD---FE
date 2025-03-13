'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import type { Event } from '../index';
import { Textarea } from '@/components/ui/textarea';

interface AddEventFormProps {
  sessionId: string;
  onAddEvent: (sessionId: string, event: Omit<Event, 'id'>) => void;
}

export function AddEventForm({ sessionId, onAddEvent }: AddEventFormProps) {
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    if (endMinutes < startMinutes) {
      setError('Thời gian kết thúc không thể nhỏ hơn thời gian bắt đầu');
      return;
    }

    setError('');

    const combinedTime = `${startTime} - ${endTime}`;
    onAddEvent(sessionId, { time: combinedTime, description });

    setStartTime('');
    setEndTime('');
    setDescription('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          <span className="text-white"> Thêm sự kiện</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Thêm sự kiện mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="startTime">Thời gian bắt đầu</Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="VD: 09:00"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">Thời gian kết thúc</Label>
            <Input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="VD: 10:00"
              required
            />
            {error && <p className="text-xs text-red">{error}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả sự kiện"
              required
            />
          </div>
          <Button type="submit">Thêm sự kiện</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
