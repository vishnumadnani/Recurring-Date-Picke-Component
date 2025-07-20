import React, { useMemo } from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  isSameDay, 
  isToday, 
  addMonths, 
  subMonths 
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRecurringDate } from '../context/RecurringDateContext';

export const CalendarPreview = () => {
  const { config, generatedDates } = useRecurringDate();
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    return days.map((date) => ({
      date,
      isCurrentMonth: date.getMonth() === currentMonth.getMonth(),
      isToday: isToday(date),
      isRecurring: generatedDates.some(recurringDate => isSameDay(date, recurringDate)),
      isStartDate: isSameDay(date, config.startDate),
      isEndDate: config.endDate ? isSameDay(date, config.endDate) : false,
    }));
  }, [currentMonth, generatedDates, config.startDate, config.endDate]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h4 className="text-sm font-medium min-w-[120px] text-center">
            {format(currentMonth, 'MMMM yyyy')}
          </h4>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div key={day} className="p-2 text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`
              p-2 text-center text-sm rounded-lg transition-all duration-200 relative
              ${!day.isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
              ${day.isToday ? 'font-bold' : ''}
              ${day.isRecurring ? 'bg-blue-100 text-blue-800 ring-1 ring-blue-200' : ''}
              ${day.isStartDate ? 'bg-green-500 text-white' : ''}
              ${day.isEndDate ? 'bg-red-500 text-white' : ''}
            `}
          >
            {format(day.date, 'd')}
            {day.isStartDate && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-600 rounded-full"></div>
            )}
            {day.isEndDate && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
          <span>Start Date</span>
        </div>
        {config.endDate && (
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
            <span>End Date</span>
          </div>
        )}
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded-sm"></div>
          <span>Recurring</span>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">
          Next {Math.min(5, generatedDates.length)} occurrences:
        </h4>
        <div className="space-y-1">
          {generatedDates.slice(0, 5).map((date, index) => (
            <div key={index} className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded">
              {format(date, 'EEE, MMM dd, yyyy')}
            </div>
          ))}
          {generatedDates.length > 5 && (
            <div className="text-xs text-gray-500">
              +{generatedDates.length - 5} more occurrences
            </div>
          )}
        </div>
      </div>
    </div>
  );
};