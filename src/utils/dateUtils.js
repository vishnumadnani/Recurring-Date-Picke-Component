import { 
  addDays, 
  addWeeks, 
  addMonths, 
  addYears, 
  format, 
  getDay, 
  getDate,
  isSameDay,
  isAfter,
  isBefore,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth
} from 'date-fns';

export const generateRecurringDates = (config) => {
  const { recurrenceType, interval, startDate, endDate, weekDays, monthDay, weekOfMonth, dayOfWeek } = config;
  const dates = [];
  const maxDates = 50; // Limit to prevent infinite loops
  
  let currentDate = startOfDay(startDate);
  const endDateTime = endDate ? endOfDay(endDate) : addYears(startDate, 1);

  while (dates.length < maxDates && !isAfter(currentDate, endDateTime)) {
    let shouldInclude = false;

    switch (recurrenceType) {
      case 'daily':
        shouldInclude = true;
        break;
        
      case 'weekly':
        if (weekDays && weekDays.length > 0) {
          shouldInclude = weekDays.includes(getDay(currentDate));
        } else {
          shouldInclude = getDay(currentDate) === getDay(startDate);
        }
        break;
        
      case 'monthly':
        if (weekOfMonth && dayOfWeek !== undefined) {
          // Pattern like "second Tuesday of every month"
          shouldInclude = isNthWeekdayOfMonth(currentDate, weekOfMonth, dayOfWeek);
        } else if (monthDay) {
          shouldInclude = getDate(currentDate) === monthDay;
        } else {
          shouldInclude = getDate(currentDate) === getDate(startDate);
        }
        break;
        
      case 'yearly':
        shouldInclude = 
          currentDate.getMonth() === startDate.getMonth() && 
          getDate(currentDate) === getDate(startDate);
        break;
    }

    if (shouldInclude && !isBefore(currentDate, startOfDay(startDate))) {
      dates.push(new Date(currentDate));
    }

    // Move to next occurrence
    switch (recurrenceType) {
      case 'daily':
        currentDate = addDays(currentDate, interval);
        break;
      case 'weekly':
        if (weekDays && weekDays.length > 0) {
          currentDate = addDays(currentDate, 1);
        } else {
          currentDate = addWeeks(currentDate, interval);
        }
        break;
      case 'monthly':
        if (weekOfMonth && dayOfWeek !== undefined) {
          // For nth weekday patterns, move to next month after finding occurrence
          if (shouldInclude) {
            currentDate = addMonths(startOfMonth(currentDate), interval);
          } else {
            currentDate = addDays(currentDate, 1);
          }
        } else {
          currentDate = addMonths(currentDate, interval);
        }
        break;
      case 'yearly':
        currentDate = addYears(currentDate, interval);
        break;
    }
  }

  return dates;
};

const isNthWeekdayOfMonth = (date, weekOfMonth, dayOfWeek) => {
  if (getDay(date) !== dayOfWeek) return false;
  
  const firstDayOfMonth = startOfMonth(date);
  const firstWeekdayOfMonth = addDays(firstDayOfMonth, (7 + dayOfWeek - getDay(firstDayOfMonth)) % 7);
  
  if (weekOfMonth === 5) {
    // Last occurrence
    const lastDayOfMonth = endOfMonth(date);
    const lastWeekdayOfMonth = addDays(lastDayOfMonth, (dayOfWeek - getDay(lastDayOfMonth) - 7) % 7);
    return isSameDay(date, lastWeekdayOfMonth);
  }
  
  const nthWeekday = addWeeks(firstWeekdayOfMonth, weekOfMonth - 1);
  return isSameDay(date, nthWeekday) && nthWeekday.getMonth() === date.getMonth();
};

export const formatDate = (date) => {
  return format(date, 'yyyy-MM-dd');
};

export const formatDisplayDate = (date) => {
  return format(date, 'MMM dd, yyyy');
};

export const getDayNames = () => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
};

export const getFullDayNames = () => {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
};