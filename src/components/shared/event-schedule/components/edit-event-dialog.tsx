'use client';

import { useState, useEffect } from 'react';
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
import { Edit } from 'lucide-react';
import type { Event } from '../index';
import { Textarea } from '@/components/ui/textarea';

export interface EditEventFormProps {
  event: Event;
  onEditEvent: (eventId: string, updatedEvent: Omit<Event, 'id'>) => void;
}

export function EditEventForm({ event, onEditEvent }: EditEventFormProps) {
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState(event.description);
  const [error, setError] = useState('');

  useEffect(() => {
    if (event.time.includes(' - ')) {
      const [start, end] = event.time.split(' - ');
      setStartTime(start);
      setEndTime(end);
    } else {
      setStartTime(event.time);
      setEndTime(event.time);
    }
    setDescription(event.description);
  }, [event]);

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
    onEditEvent(event.id, { time: combinedTime, description });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="bg-blue/10 text-blue hover:bg-blue/30 hover:text-blue"
        >
          <Edit className="mr-2 h-4 w-4" />
          <span>Sửa</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa sự kiện</DialogTitle>
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
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
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
          <Button type="submit">Lưu thay đổi</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
