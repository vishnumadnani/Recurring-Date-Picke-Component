// Recurring date configuration and types
export const RecurrenceTypes = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly'
};

// Default configuration for recurring dates
export const defaultRecurringConfig = {
  recurrenceType: RecurrenceTypes.DAILY,
  interval: 1,
  startDate: new Date(),
  endDate: null,
  weekDays: [],
  monthDay: null,
  weekOfMonth: null,
  dayOfWeek: null
};