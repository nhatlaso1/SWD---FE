import { EditEventForm } from './edit-event-dialog';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimeSlotProps {
  id: string;
  time: string;
  event: string;
  onDelete: () => void;
  onEdit: (updatedEvent: { time: string; description: string }) => void;
  isCanChange: boolean;
  completed: boolean;
  onToggleComplete: () => void;
}

export function TimeSlot({
  id,
  time,
  event,
  onDelete,
  onEdit,
  isCanChange,
  completed,
  onToggleComplete
}: TimeSlotProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div
        className={`font-mediu w-full rounded-lg bg-secondary p-4 text-center md:w-48
        ${completed ? 'text-muted-foreground line-through' : ''}
      `}
      >
        {time}
      </div>
      <div className="flex flex-1 items-center justify-between gap-2 rounded-lg border border-white/20 bg-secondary p-4">
        <span
          className={` ${completed ? 'text-muted-foreground line-through' : ''}`}
        >
          {event}
        </span>
        {isCanChange && (
          <div className="flex items-center gap-2">
            <EditEventForm
              event={{ id, time, description: event, completed }}
              onEditEvent={(eventId, updatedEvent) => {
                onEdit(updatedEvent);
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="bg-red/10 text-red hover:bg-red/20 hover:text-red"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            {/* Thay thế nút bằng checkbox */}
            <label className="flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={completed}
                onChange={onToggleComplete}
                className="h-4 w-4 text-green-400"
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
