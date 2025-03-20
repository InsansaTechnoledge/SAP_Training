import React, { useState, useMemo } from 'react';
import { Clock, Award, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const StreakTab = ({ user }) => {
  // State to track current month view
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  // Get all available months from the data
  const months = useMemo(() => {
    // Get unique months from streak data
    const dates = Object.keys(user.streakData).sort();
    const uniqueMonths = [];
    
    dates.forEach(date => {
      const monthYear = date.substring(0, 7); // YYYY-MM format
      if (!uniqueMonths.includes(monthYear)) {
        uniqueMonths.push(monthYear);
      }
    });
    
    // If no data, add current month
    if (uniqueMonths.length === 0) {
      const now = new Date();
      uniqueMonths.push(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`);
    }
    
    return uniqueMonths;
  }, [user.streakData]);

  // Calculate data for the current month view
  const currentMonthData = useMemo(() => {
    if (months.length === 0) return null;
    
    const currentMonth = months[currentMonthIndex];
    const year = parseInt(currentMonth.split('-')[0]);
    const month = parseInt(currentMonth.split('-')[1]) - 1; // 0-based month
    
    // Create start and end dates for the month
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0); // Last day of month
    
    // Filter streak data for current month
    const values = Object.entries(user.streakData)
      .filter(([date]) => date.startsWith(currentMonth))
      .map(([date, count]) => ({ date, count }));
    
    return {
      startDate,
      endDate,
      values,
      monthName: startDate.toLocaleString('default', { month: 'long', year: 'numeric' })
    };
  }, [months, currentMonthIndex, user.streakData]);

  // Handle month navigation
  const goToPreviousMonth = () => {
    setCurrentMonthIndex(prev => (prev > 0 ? prev - 1 : prev));
  };
  
  const goToNextMonth = () => {
    setCurrentMonthIndex(prev => (prev < months.length - 1 ? prev + 1 : prev));
  };
  
  // Format date for tooltip display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Your Activity Streak</h3>
        <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
          <Clock size={18} className="text-yellow-500 mr-2" />
          <span className="font-bold text-yellow-700">{user.streak} Day Streak</span>
        </div>
      </div>
      
      {/* Streak progress section */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center mb-3">
          <Award size={22} className="text-yellow-500 mr-2" />
          <span className="font-bold text-gray-800">Current Streak: {user.streak} days</span>
          <div className="ml-auto flex items-center text-sm text-gray-500">
            <Info size={14} className="mr-1" />
            <span>Next milestone: 30 days</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${Math.min((user.streak % 30) * 100 / 30, 100)}%` }}
          ></div>
        </div>
        
        {/* Progress markers */}
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>0 days</span>
          <span>10 days</span>
          <span>20 days</span>
          <span>30 days</span>
        </div>
      </div>
      
      {/* Calendar heatmap section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-gray-800">Monthly Activity</h4>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 mr-2">Activity Level:</span>
            <div className="flex gap-1 items-center">
              <div className="w-3 h-3 bg-gray-100 rounded-sm border border-gray-200"></div>
              <div className="w-3 h-3 bg-blue-100 rounded-sm"></div>
              <div className="w-3 h-3 bg-blue-300 rounded-sm"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              <div className="w-3 h-3 bg-blue-700 rounded-sm"></div>
              <span className="text-xs text-gray-500 ml-1">High</span>
            </div>
          </div>
        </div>
        
        {/* Month navigation */}
        <div className="flex justify-between items-center mb-2">
          <button 
            onClick={goToPreviousMonth}
            disabled={currentMonthIndex === 0}
            className={`p-1 rounded-full ${currentMonthIndex === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <ChevronLeft size={20} />
          </button>
          
          <h5 className="font-medium text-gray-700">{currentMonthData?.monthName}</h5>
          
          <button 
            onClick={goToNextMonth}
            disabled={currentMonthIndex === months.length - 1}
            className={`p-1 rounded-full ${currentMonthIndex === months.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        {/* Custom weekday labels */}
        <div className="flex justify-between text-xs text-gray-500 mb-1 px-8">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>
        
        {/* Calendar heatmap visualization */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          {currentMonthData && (
            <CalendarHeatmap
              startDate={currentMonthData.startDate}
              endDate={currentMonthData.endDate}
              values={currentMonthData.values}
              classForValue={(value) => {
                if (!value || value.count === 0) return 'color-empty';
                return `color-scale-${Math.min(value.count, 4)}`;
              }}
              tooltipDataAttrs={(value) => {
                if (!value || !value.date) return null;
                return {
                  'data-tip': value.count ? 
                    `${formatDate(value.date)}: ${value.count} activities` : 
                    `${formatDate(value.date)}: No activity`
                };
              }}
              showWeekdayLabels={false}
              showMonthLabels={false}
              gutterSize={4}
            />
          )}
          
          {/* Monthly Stats */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Total Activities</span>
              <span className="font-bold text-gray-800">
                {currentMonthData?.values.reduce((sum, item) => sum + item.count, 0) || 0}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Active Days</span>
              <span className="font-bold text-gray-800">
                {currentMonthData?.values.filter(item => item.count > 0).length || 0}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Avg. Activity</span>
              <span className="font-bold text-gray-800">
                {currentMonthData?.values.length > 0 
                  ? (currentMonthData.values.reduce((sum, item) => sum + item.count, 0) / currentMonthData.values.length).toFixed(1) 
                  : '0'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Monthly Trend */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <h5 className="font-bold text-gray-800 mb-3">Monthly Overview</h5>
        <div className="flex overflow-x-auto pb-2">
          {months.map((month, index) => {
            const monthYear = month.split('-');
            const monthName = new Date(parseInt(monthYear[0]), parseInt(monthYear[1]) - 1).toLocaleString('default', { month: 'short' });
            const isActive = index === currentMonthIndex;
            
            return (
              <div 
                key={month} 
                className={`flex-none mr-2 px-3 py-2 rounded-md cursor-pointer ${isActive ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}
                onClick={() => setCurrentMonthIndex(index)}
              >
                <div className="text-xs text-gray-500">{monthName}</div>
                <div className={`text-sm font-medium ${isActive ? 'text-blue-700' : 'text-gray-700'}`}>{monthYear[0]}</div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Streak explanation */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h5 className="font-bold text-blue-800 mb-2">Understanding Your Streak</h5>
        <p className="text-sm text-blue-700 mb-2">
          Your streak increases each day you complete at least one activity on the platform.
          Missing a day will reset your streak to zero.
        </p>
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-100 rounded-sm mr-2"></div>
            <span className="text-gray-700">Light activity (1 action)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-300 rounded-sm mr-2"></div>
            <span className="text-gray-700">Moderate activity (2 actions)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
            <span className="text-gray-700">High activity (3 actions)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-700 rounded-sm mr-2"></div>
            <span className="text-gray-700">Very high activity (4+ actions)</span>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for the heatmap */}
      <style jsx>{`
        .react-calendar-heatmap {
          font-size: 0.6rem;
        }
        .react-calendar-heatmap .color-empty {
          fill: #f3f4f6;
          stroke: #e5e7eb;
          stroke-width: 0.5;
        }
        .react-calendar-heatmap .color-scale-1 {
          fill: #dbeafe;
        }
        .react-calendar-heatmap .color-scale-2 {
          fill: #93c5fd;
        }
        .react-calendar-heatmap .color-scale-3 {
          fill: #3b82f6;
        }
        .react-calendar-heatmap .color-scale-4 {
          fill: #1e40af;
        }
        .react-calendar-heatmap text {
          font-size: 0.6rem;
          fill: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default StreakTab;