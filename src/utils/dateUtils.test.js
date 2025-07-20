import { describe, it, expect } from 'vitest';
import { generateRecurringDates } from './dateUtils';

describe('dateUtils', () => {
  describe('generateRecurringDates', () => {
    it('should generate daily recurring dates', () => {
      const config = {
        recurrenceType: 'daily',
        interval: 1,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-05'),
      };

      const dates = generateRecurringDates(config);
      expect(dates).toHaveLength(5);
      expect(dates[0]).toEqual(new Date('2024-01-01'));
      expect(dates[4]).toEqual(new Date('2024-01-05'));
    });

    it('should generate weekly recurring dates', () => {
      const config = {
        recurrenceType: 'weekly',
        interval: 1,
        startDate: new Date('2024-01-01'), // Monday
        endDate: new Date('2024-01-29'),
      };

      const dates = generateRecurringDates(config);
      expect(dates).toHaveLength(5); // 5 Mondays in January 2024
    });

    it('should generate weekly recurring dates for specific days', () => {
      const config = {
        recurrenceType: 'weekly',
        interval: 1,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-07'),
        weekDays: [1, 3, 5], // Monday, Wednesday, Friday
      };

      const dates = generateRecurringDates(config);
      expect(dates).toHaveLength(3);
    });

    it('should generate monthly recurring dates', () => {
      const config = {
        recurrenceType: 'monthly',
        interval: 1,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-03-31'),
      };

      const dates = generateRecurringDates(config);
      expect(dates).toHaveLength(3); // Jan 15, Feb 15, Mar 15
    });

    it('should generate monthly recurring dates for nth weekday pattern', () => {
      const config = {
        recurrenceType: 'monthly',
        interval: 1,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-03-31'),
        weekOfMonth: 2, // Second
        dayOfWeek: 1, // Monday
      };

      const dates = generateRecurringDates(config);
      expect(dates.length).toBeGreaterThan(0);
      
      // All dates should be Mondays
      dates.forEach(date => {
        expect(date.getDay()).toBe(1);
      });
    });

    it('should generate yearly recurring dates', () => {
      const config = {
        recurrenceType: 'yearly',
        interval: 1,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2026-12-31'),
      };

      const dates = generateRecurringDates(config);
      expect(dates).toHaveLength(3); // 2024, 2025, 2026
    });

    it('should respect interval for daily recurrence', () => {
      const config = {
        recurrenceType: 'daily',
        interval: 3,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-10'),
      };

      const dates = generateRecurringDates(config);
      expect(dates).toHaveLength(4); // Jan 1, 4, 7, 10
    });

    it('should limit dates to prevent infinite loops', () => {
      const config = {
        recurrenceType: 'daily',
        interval: 1,
        startDate: new Date('2024-01-01'),
        // No end date - should use default limit
      };

      const dates = generateRecurringDates(config);
      expect(dates.length).toBeLessThanOrEqual(50);
    });
  });

  it('should generate second Tuesday of every month correctly', () => {
    const config = {
      recurrenceType: 'monthly',
      interval: 1,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-06-30'),
      weekOfMonth: 2, // Second
      dayOfWeek: 2, // Tuesday (0=Sunday, 1=Monday, 2=Tuesday...)
    };

    const dates = generateRecurringDates(config);
    
    // Should have 6 dates (Jan through June 2024)
    expect(dates).toHaveLength(6);
    
    // All dates should be Tuesdays
    dates.forEach(date => {
      expect(date.getDay()).toBe(2); // Tuesday
    });
    
    // Verify specific dates for 2024
    const expectedDates = [
      new Date('2024-01-09'), // Second Tuesday of January
      new Date('2024-02-13'), // Second Tuesday of February  
      new Date('2024-03-12'), // Second Tuesday of March
      new Date('2024-04-09'), // Second Tuesday of April
      new Date('2024-05-14'), // Second Tuesday of May
      new Date('2024-06-11'), // Second Tuesday of June
    ];
    
    dates.forEach((date, index) => {
      expect(date.toDateString()).toBe(expectedDates[index].toDateString());
    });
  });

  it('should handle last Tuesday of every month', () => {
    const config = {
      recurrenceType: 'monthly',
      interval: 1,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-03-31'),
      weekOfMonth: 5, // Last
      dayOfWeek: 2, // Tuesday
    };

    const dates = generateRecurringDates(config);
    
    // Should have 3 dates (Jan, Feb, Mar 2024)
    expect(dates).toHaveLength(3);
    
    // All dates should be Tuesdays
    dates.forEach(date => {
      expect(date.getDay()).toBe(2);
    });
    
    // Verify these are actually the last Tuesdays
    const expectedDates = [
      new Date('2024-01-30'), // Last Tuesday of January
      new Date('2024-02-27'), // Last Tuesday of February
      new Date('2024-03-26'), // Last Tuesday of March
    ];
    
    dates.forEach((date, index) => {
      expect(date.toDateString()).toBe(expectedDates[index].toDateString());
    });
  });
});