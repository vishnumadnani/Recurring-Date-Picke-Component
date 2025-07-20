# Recurring Date Picker

A beautiful and flexible recurring date picker component built with React.js, TypeScript, Tailwind CSS, and React Context API. This component replicates functionality similar to TickTick's recurring date picker with a modern, intuitive interface.

## ✨ Features

- **Multiple Recurrence Types**: Daily, Weekly, Monthly, and Yearly patterns
- **Flexible Customization**: 
  - "Every X days/weeks/months/years" intervals
  - Specific weekday selection for weekly patterns
  - Monthly pattern options (same date vs same weekday)
- **Visual Calendar Preview**: Live preview showing all recurring dates
- **Date Range Selection**: Optional start and end dates
- **Beautiful UI**: Modern design with smooth animations and color coding
- **Responsive Design**: Works great on all screen sizes
- **Type Safe**: Built with TypeScript for better development experience

## 🚀 Getting Started
### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd recurring-date-picker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 🧪 Testing

Run the test suite:

```bash
npm test
```

This will run:
- Unit tests for date utility functions
- Unit tests for recurrence calculation logic
- Integration tests for the complete component

## 🏗️ Architecture

### Component Structure

- **`RecurrencePicker`**: Main container component
- **`RecurrenceSelector`**: UI for selecting recurrence type (Daily/Weekly/Monthly/Yearly)
- **`CustomizationControls`**: Controls for intervals, weekdays, and patterns
- **`DateRangePicker`**: Start and end date selection
- **`CalendarPreview`**: Visual calendar showing recurring dates
- **`RecurrenceContext`**: Context provider managing recurrence state

### State Management

The component uses React Context API for centralized state management:

```tsx
interface RecurrenceState {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  weekdays: boolean[];
  monthlyPattern: 'date' | 'weekday';
  startDate: Date | null;
  endDate: Date | null;
  previewDates: Date[];
}
```

### Utilities

- **`dateUtils.ts`**: Core date calculation and formatting utilities
- **`generateRecurringDates()`**: Generates array of recurring dates based on configuration
- **`formatRecurrenceText()`**: Creates human-readable recurrence descriptions
- **`validateRecurrenceConfig()`**: Validates recurrence configuration

## 🎨 Design System

The component uses a comprehensive design system with:

- **Color-coded recurrence types**: Blue (Daily), Green (Weekly), Purple (Monthly), Orange (Yearly)
- **Smooth animations**: Hover effects, transitions, and micro-interactions
- **Consistent spacing**: Based on Tailwind's spacing system
- **Typography hierarchy**: Clear visual hierarchy for readability
- **Responsive grid layouts**: Adapts to different screen sizes

## 🛠️ Customization

### Styling

The component uses Tailwind CSS with custom design tokens defined in `src/index.css`:

```css
:root {
  --daily: 212 100% 48%;
  --weekly: 142 71% 45%;
  --monthly: 271 81% 56%;
  --yearly: 25 95% 53%;
  /* ... more tokens */
}
```

### Extending Functionality

To add new recurrence patterns:

1. Update the `RecurrenceType` in `RecurrenceContext.tsx`
2. Add logic to `generateRecurringDates()` in `dateUtils.ts`
3. Update the UI in `RecurrenceSelector.tsx`
4. Add appropriate styling in the design system

## 📋 Examples

### Basic Usage

```tsx
import { RecurrencePicker } from './components/RecurrencePicker/RecurrencePicker';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <RecurrencePicker />
    </div>
  );
}
```

### Using the Context

```tsx
import { useRecurrence } from './contexts/RecurrenceContext';

function MyComponent() {
  const { state, generateRecurrenceDates } = useRecurrence();
  
  const dates = generateRecurrenceDates();
  console.log('Next 10 occurrences:', dates.slice(0, 10));
  
  return <div>...</div>;
}
```

## 🧮 Recurrence Patterns

### Daily
- Every N days
- Example: "Every 3 days"

### Weekly  
- Every N weeks
- Specific weekdays (Mon, Tue, Wed, etc.)
- Example: "Every 2 weeks on Mon, Wed, Fri"

### Monthly
- Every N months on the same date
- Every N months on the same weekday pattern
- Example: "Every 3 months on the 15th" or "Every month on the 2nd Tuesday"

### Yearly
- Every N years on the same date
- Example: "Every 2 years"

## 🏷️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and design system
- **date-fns** - Date manipulation
- **Radix UI** - Accessible UI primitives
- **Lucide React** - Beautiful icons
- **Vitest** - Fast unit testing
- **React Testing Library** - Component testing

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components (shadcn/ui)
│   └── RecurrencePicker/      # Main feature components
├── contexts/
│   └── RecurrenceContext.tsx  # State management
├── utils/
│   └── dateUtils.ts          # Date calculation utilities
├── __tests__/                # Test files
└── pages/
    └── Index.tsx             # Main page
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by TickTick's recurring date picker
- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Icons by [Lucide](https://lucide.dev/)
