'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AddEventForm } from './components/add-event-form';
import { AddSessionForm } from './components/add-session-form';
import { Card } from '@/components/ui/card';
import { TimeSlot } from './components/time-slot';
import { Instruction } from './components/instruction';

export const initialSchedule: Session[] = [
  {
    id: '1',
    title: 'Buổi sáng – Hội thảo',
    events: [
      {
        id: '1-1',
        time: '8:30 – 9:30',
        description: 'Đón khách',
        completed: false
      },
      {
        id: '1-2',
        time: '9:30',
        description: 'Bắt đầu sự kiện',
        completed: false
      },
      {
        id: '1-3',
        time: '9:30 – 10:30',
        description:
          'Phiên tọa đàm với chủ đề Tiện tệ thông minh & Ứng dụng công nghệ AI vào sản xuất.',
        completed: false
      },
      {
        id: '1-4',
        time: '10:30 – 11:00',
        description: 'Giao lưu với diễn giả',
        completed: false
      },
      {
        id: '1-5',
        time: '11:00 – 12:00',
        description: 'Kết nối giao thương',
        completed: false
      }
    ]
  },
  {
    id: '2',
    title: 'Buổi trưa – Hội thảo với khách mời đặc biệt',
    events: [
      {
        id: '2-1',
        time: '12:00 – 13:00',
        description: 'Ăn trưa cùng nhau & nghỉ trưa',
        completed: false
      },
      {
        id: '2-2',
        time: '13:00 – 15:00',
        description: 'Phiên tọa tâm quan trọng với khách mời đặc biệt',
        completed: false
      },
      {
        id: '2-3',
        time: '15:00 – 16:00',
        description: 'Chương trình Q&A với diễn giả',
        completed: false
      },
      {
        id: '2-4',
        time: '16:00 – 17:00',
        description: 'Kết nối giao thương',
        completed: false
      }
    ]
  },
  {
    id: '3',
    title: 'Buổi tối – Gala Dinner',
    events: [
      {
        id: '3-1',
        time: '18:00 – 19:00',
        description: 'Đón khách tham dự Gala Dinner',
        completed: false
      },
      {
        id: '3-2',
        time: '19:00',
        description: 'Nhập tiệc Gala Dinner',
        completed: false
      },
      {
        id: '3-3',
        time: '20:00',
        description: 'Quay số trúng thưởng',
        completed: false
      },
      {
        id: '3-4',
        time: '21:00',
        description: 'Bế mạc chương trình',
        completed: false
      }
    ]
  }
];

export interface Event {
  id: string;
  time: string;
  description: string;
  completed?: boolean;
}

export interface Session {
  id: string;
  title: string;
  events: Event[];
}

export default function EventSchedule({
  isCanChange
}: {
  isCanChange: boolean;
}) {
  const [schedule, setSchedule] = useState<Session[]>(initialSchedule);

  const handleAddSession = (newSession: Omit<Session, 'id' | 'events'>) => {
    if (!isCanChange) return;
    const id = (schedule.length + 1).toString();
    setSchedule([...schedule, { ...newSession, id, events: [] }]);
  };

  const handleAddEvent = (sessionId: string, newEvent: Omit<Event, 'id'>) => {
    if (!isCanChange) return;
    setSchedule(
      schedule.map((session) => {
        if (session.id === sessionId) {
          const eventId = `${sessionId}-${session.events.length + 1}`;
          return {
            ...session,
            events: [
              ...session.events,
              { ...newEvent, id: eventId, completed: false }
            ]
          };
        }
        return session;
      })
    );
  };

  const handleDeleteEvent = (sessionId: string, eventId: string) => {
    if (!isCanChange) return;
    setSchedule(
      schedule.map((session) => {
        if (session.id === sessionId) {
          return {
            ...session,
            events: session.events.filter((event) => event.id !== eventId)
          };
        }
        return session;
      })
    );
  };

  const handleDeleteSession = (sessionId: string) => {
    if (!isCanChange) return;
    setSchedule(schedule.filter((session) => session.id !== sessionId));
  };

  const handleEditEvent = (
    sessionId: string,
    eventId: string,
    updatedEvent: { time: string; description: string }
  ) => {
    if (!isCanChange) return;
    setSchedule(
      schedule.map((session) => {
        if (session.id === sessionId) {
          return {
            ...session,
            events: session.events.map((event) =>
              event.id === eventId ? { ...event, ...updatedEvent } : event
            )
          };
        }
        return session;
      })
    );
  };

  const handleToggleComplete = (sessionId: string, eventId: string) => {
    if (!isCanChange) return;
    setSchedule(
      schedule.map((session) => {
        if (session.id === sessionId) {
          return {
            ...session,
            events: session.events.map((event) =>
              event.id === eventId
                ? { ...event, completed: !event.completed }
                : event
            )
          };
        }
        return session;
      })
    );
  };

  return (
    <Card className="w-fit ">
      <div className="h-fit max-w-6xl p-4 md:min-w-[900px] md:p-8">
        <div>
          {isCanChange && (
            <div className="flex justify-between">
              <AddSessionForm onAddSession={handleAddSession} />
              <Instruction />
            </div>
          )}

          <div className="space-y-12">
            {schedule.map((session) => (
              <section key={session.id} className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{session.title}</h2>
                  {isCanChange && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteSession(session.id)}
                    >
                      Xóa phiên
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  {session.events.map((event) => (
                    <TimeSlot
                      key={event.id}
                      id={event.id}
                      time={event.time}
                      event={event.description}
                      onDelete={() => handleDeleteEvent(session.id, event.id)}
                      onEdit={(updatedEvent) =>
                        handleEditEvent(session.id, event.id, updatedEvent)
                      }
                      isCanChange={isCanChange}
                      completed={event.completed || false}
                      onToggleComplete={() =>
                        handleToggleComplete(session.id, event.id)
                      }
                    />
                  ))}
                </div>

                {isCanChange && (
                  <div className="mt-4">
                    <AddEventForm
                      sessionId={session.id}
                      onAddEvent={handleAddEvent}
                    />
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
