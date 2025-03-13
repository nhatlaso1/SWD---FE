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
import type { Session } from '../index';

interface AddSessionFormProps {
  onAddSession: (session: Omit<Session, 'id' | 'events'>) => void;
}

export function AddSessionForm({ onAddSession }: AddSessionFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSession({ title });
    setTitle('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-8 bg-orange-500">
          <Plus className="mr-2 h-4 w-4" />
          Thêm phiên mới
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Thêm phiên mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề phiên</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Buổi sáng - Hội thảo"
              required
            />
          </div>
          <Button type="submit">Tạo phiên</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
