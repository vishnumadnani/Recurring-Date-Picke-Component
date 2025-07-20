import React from 'react';
import { RecurringDateProvider } from './context/RecurringDateContext';
import { RecurringDatePicker } from './components/RecurringDatePicker';

function App() {
  const handleSave = (config, dates) => {
    console.log('Saved recurring pattern:', { config, dates });
    // Here you would typically save to your backend or local storage
    alert(`Pattern saved! Generated ${dates.length} recurring dates.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <RecurringDateProvider>
        <RecurringDatePicker onSave={handleSave} />
      </RecurringDateProvider>
    </div>
  );
}

export default App;