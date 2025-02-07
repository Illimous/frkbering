'use client';
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { da } from 'date-fns/locale';

interface TimeSlot {
  id: number;
  date: string;
  time: string;
  available: boolean;
}

interface CalendarProps {
  timeSlots: TimeSlot[];
  isAdmin?: boolean;
  onSlotClick?: (date: Date, time?: string) => void;
}

export default function Calendar({ timeSlots, isAdmin = false, onSlotClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const availableTimesForDate = (date: Date) => {
    return timeSlots.filter(
      slot => slot.date === format(date, 'yyyy-MM-dd') && slot.available
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
    if (onSlotClick) {
      onSlotClick(date);
    }
  };

  const handleTimeClick = (time: string) => {
    setSelectedTimeSlot(time);
    if (onSlotClick && selectedDate) {
      onSlotClick(selectedDate, time);
    }
  };

  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-6 space-y-6">
      {/* Kalender Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          className="p-2 hover:bg-[#F5D9D5] rounded-full transition-colors"
        >
          ←
        </button>
        <h2 className="font-playfair text-2xl text-[#59585E] capitalize">
          {format(currentDate, 'MMMM yyyy', { locale: da })}
        </h2>
        <button
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          className="p-2 hover:bg-[#F5D9D5] rounded-full transition-colors"
        >
          →
        </button>
      </div>

      {/* Ugedage */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['man', 'tir', 'ons', 'tor', 'fre', 'lør', 'søn'].map((day) => (
          <div key={day} className="text-center font-playfair text-[#59585E]">
            {day}
          </div>
        ))}
      </div>

      {/* Kalenderdage */}
      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((date) => {
          const isCurrentMonth = isSameMonth(date, currentDate);
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const hasAvailableSlots = availableTimesForDate(date).length > 0;

          return (
            <button
              key={date.toString()}
              onClick={() => handleDateClick(date)}
              className={`
                p-2 rounded-full text-center transition-all
                ${!isCurrentMonth ? 'text-[#6C6C75]/50' : 'text-[#59585E]'}
                ${isSelected ? 'bg-[#59585E] text-[#F5D9D5]' : ''}
                ${hasAvailableSlots ? 'hover:bg-[#F5D9D5]' : 'cursor-not-allowed opacity-50'}
              `}
              disabled={!hasAvailableSlots}
            >
              {format(date, 'd')}
              {hasAvailableSlots && (
                <div className="h-1 w-1 bg-[#59585E] rounded-full mx-auto mt-1"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Tilgængelige tider */}
      {selectedDate && (
        <div className="mt-6">
          <h3 className="font-playfair text-xl text-[#59585E] mb-4">
            Tilgængelige tider {format(selectedDate, 'd. MMMM', { locale: da })}
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {availableTimesForDate(selectedDate).map((slot) => (
              <button
                key={slot.time}
                onClick={() => handleTimeClick(slot.time)}
                className={`
                  p-3 rounded-full text-center transition-all
                  ${selectedTimeSlot === slot.time
                    ? 'bg-[#59585E] text-[#F5D9D5]'
                    : 'bg-white/50 hover:bg-[#F5D9D5] text-[#59585E]'
                  }
                `}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Admin Controls */}
      {isAdmin && selectedDate && (
        <div className="mt-6 p-4 bg-white/50 rounded-2xl">
          <h3 className="font-playfair text-xl text-[#59585E] mb-4">
            Administrer tider
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="time"
                className="px-4 py-2 rounded-lg bg-white/70 border-2 border-[#59585E]/20 focus:border-[#59585E] transition-colors"
              />
              <button className="px-6 py-2 bg-[#59585E] text-[#F5D9D5] rounded-full hover:bg-[#6C6C75] transition-colors">
                Tilføj tid
              </button>
            </div>
            <button className="w-full px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
              Fjern alle tider denne dag
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 