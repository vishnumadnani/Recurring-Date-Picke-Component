import React, { createContext, useContext, useState, useMemo } from 'react';
import { defaultRecurringConfig } from '../types/recurring.js';
import { generateRecurringDates } from '../utils/dateUtils.js';

const RecurringDateContext = createContext(undefined);

export const RecurringDateProvider = ({ children }) => {
  const [config, setConfig] = useState(defaultRecurringConfig);

  const updateConfig = (updates) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const resetConfig = () => {
    setConfig(defaultRecurringConfig);
  };

  const generatedDates = useMemo(() => {
    return generateRecurringDates(config);
  }, [config]);

  const value = {
    config,
    updateConfig,
    generatedDates,
    resetConfig,
  };

  return (
    <RecurringDateContext.Provider value={value}>
      {children}
    </RecurringDateContext.Provider>
  );
};

export const useRecurringDate = () => {
  const context = useContext(RecurringDateContext);
  if (!context) {
    throw new Error('useRecurringDate must be used within a RecurringDateProvider');
  }
  return context;
};