import React from 'react';
import { useRecurringDate } from '../context/RecurringDateContext';
import { getFullDayNames } from '../utils/dateUtils';

export const RecurrenceOptions = () => {
  const { config, updateConfig } = useRecurringDate();

  const recurrenceTypes = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  const weekNumbers = [
    { value: 1, label: 'First' },
    { value: 2, label: 'Second' },
    { value: 3, label: 'Third' },
    { value: 4, label: 'Fourth' },
    { value: 5, label: 'Last' },
  ];

  const dayNames = getFullDayNames();

  const handleWeekDayToggle = (dayIndex) => {
    const currentWeekDays = config.weekDays || [];
    const newWeekDays = currentWeekDays.includes(dayIndex)
      ? currentWeekDays.filter(d => d !== dayIndex)
      : [...currentWeekDays, dayIndex].sort();
    
    updateConfig({ weekDays: newWeekDays });
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900">Recurrence Pattern</h3>
      
      {/* Recurrence Type Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Repeat</label>
        <div className="grid grid-cols-2 gap-2">
          {recurrenceTypes.map(type => (
            <button
              key={type.value}
              onClick={() => updateConfig({ recurrenceType: type.value })}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                config.recurrenceType === type.value
                  ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interval Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Every {config.interval} {config.recurrenceType === 'daily' ? 'day(s)' : 
                   config.recurrenceType === 'weekly' ? 'week(s)' : 
                   config.recurrenceType === 'monthly' ? 'month(s)' : 'year(s)'}
        </label>
        <input
          type="number"
          min="1"
          max="365"
          value={config.interval}
          onChange={(e) => updateConfig({ interval: Math.max(1, parseInt(e.target.value) || 1) })}
          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Weekly Options */}
      {config.recurrenceType === 'weekly' && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Repeat on</label>
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map((day, index) => (
              <button
                key={day}
                onClick={() => handleWeekDayToggle(index)}
                className={`px-2 py-2 text-xs rounded-lg border transition-all duration-200 ${
                  (config.weekDays || []).includes(index)
                    ? 'bg-purple-500 text-white border-purple-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Advanced Options */}
      {config.recurrenceType === 'monthly' && (
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Monthly Pattern</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="monthlyPattern"
                  checked={!config.weekOfMonth}
                  onChange={() => updateConfig({ weekOfMonth: undefined, dayOfWeek: undefined })}
                  className="text-blue-500"
                />
                <span className="text-sm">On day {config.startDate.getDate()} of each month</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="monthlyPattern"
                  checked={!!config.weekOfMonth}
                  onChange={() => updateConfig({ 
                    weekOfMonth: 1, 
                    dayOfWeek: config.startDate.getDay() 
                  })}
                  className="text-blue-500"
                />
                <span className="text-sm">On the</span>
              </label>
            </div>
          </div>

          {config.weekOfMonth && (
            <div className="ml-6 space-y-3">
              <div className="flex space-x-2">
                <select
                  value={config.weekOfMonth}
                  onChange={(e) => updateConfig({ weekOfMonth: parseInt(e.target.value) })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {weekNumbers.map(week => (
                    <option key={week.value} value={week.value}>{week.label}</option>
                  ))}
                </select>
                <select
                  value={config.dayOfWeek}
                  onChange={(e) => updateConfig({ dayOfWeek: parseInt(e.target.value) })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {dayNames.map((day, index) => (
                    <option key={day} value={index}>{day}</option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-gray-500">of each month</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};