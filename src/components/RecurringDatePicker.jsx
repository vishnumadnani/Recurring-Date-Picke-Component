import React from 'react';
import { RefreshCw, Save } from 'lucide-react';
import { useRecurringDate } from '../context/RecurringDateContext';
import { DateInput } from './DateInput';
import { RecurrenceOptions } from './RecurrenceOptions';
import { CalendarPreview } from './CalendarPreview';
import { formatDate } from '../utils/dateUtils';

export const RecurringDatePicker = ({ onSave }) => {
  const { config, updateConfig, generatedDates, resetConfig } = useRecurringDate();

  const handleSave = () => {
    if (onSave) {
      onSave(config, generatedDates);
    }
  };

  const generateSummaryText = (config) => {
    const { recurrenceType, interval, weekDays, weekOfMonth, dayOfWeek } = config;
    
    const intervalText = interval === 1 ? '' : `every ${interval} `;
    
    switch (recurrenceType) {
      case 'daily':
        return `Repeats ${intervalText}day${interval > 1 ? 's' : ''}`;
      
      case 'weekly':
        if (weekDays && weekDays.length > 0) {
          const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const selectedDays = weekDays.map(d => dayNames[d]).join(', ');
          return `Repeats ${intervalText}week${interval > 1 ? 's' : ''} on ${selectedDays}`;
        }
        return `Repeats ${intervalText}week${interval > 1 ? 's' : ''}`;
      
      case 'monthly':
        if (weekOfMonth && dayOfWeek !== undefined) {
          const weekNames = ['', 'first', 'second', 'third', 'fourth', 'last'];
          const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          return `Repeats ${intervalText}month${interval > 1 ? 's' : ''} on the ${weekNames[weekOfMonth]} ${dayNames[dayOfWeek]}`;
        }
        return `Repeats ${intervalText}month${interval > 1 ? 's' : ''} on day ${config.startDate.getDate()}`;
      
      case 'yearly':
        return `Repeats ${intervalText}year${interval > 1 ? 's' : ''}`;
      
      default:
        return 'Invalid recurrence pattern';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Recurring Date Picker</h2>
        <div className="flex space-x-2">
          <button
            onClick={resetConfig}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reset</span>
          </button>
          {onSave && (
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save Pattern</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Date Range Section */}
          <div className="p-6 bg-white rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Date Range</h3>
            <div className="space-y-4">
              <DateInput
                label="Start Date"
                value={config.startDate}
                onChange={(date) => date && updateConfig({ startDate: date })}
                required
              />
              <DateInput
                label="End Date (Optional)"
                value={config.endDate}
                onChange={(date) => updateConfig({ endDate: date })}
                min={formatDate(config.startDate)}
              />
            </div>
          </div>

          <RecurrenceOptions />
        </div>

        <div>
          <CalendarPreview />
        </div>
      </div>

      {/* Summary Section */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Pattern Summary</h3>
        <p className="text-gray-700">
          {generateSummaryText(config)} 
          {config.endDate && ` until ${formatDate(config.endDate)}`}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          This pattern will generate {generatedDates.length} occurrence{generatedDates.length !== 1 ? 's' : ''}.
        </p>
      </div>
    </div>
  );
};