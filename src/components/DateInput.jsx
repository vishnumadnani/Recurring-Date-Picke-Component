import React from 'react';
import { Calendar } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

export const DateInput = ({ 
  label, 
  value, 
  onChange, 
  required = false,
  min 
}) => {
  const handleChange = (e) => {
    const dateValue = e.target.value;
    if (dateValue) {
      onChange(new Date(dateValue));
    } else {
      onChange(undefined);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type="date"
          value={value ? formatDate(value) : ''}
          onChange={handleChange}
          min={min}
          required={required}
          className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
        />
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};