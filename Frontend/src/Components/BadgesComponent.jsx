import React, { useState, useRef, useEffect } from 'react';
import { Trophy, Award, Medal, Star, ChevronDown, ChevronUp } from 'lucide-react';

const BadgesComponent = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({});
  const containerRef = useRef(null);
  
  // Enhanced badges data with conditions
  const badges = [
    {
      id: 1,
      name: "Hackathon Winner",
      icon: Trophy,
      earned: true,
      condition: "Win first place in any hackathon",
      category: "Competitions"
    },
    {
      id: 2,
      name: "Ideathon Finalist",
      icon: Medal,
      earned: true,
      condition: "Reach the finals of an ideathon",
      category: "Competitions"
    },
    {
      id: 3,
      name: "1v1 Quiz Champion",
      icon: Star,
      earned: true,
      condition: "Win 5 consecutive 1v1 quiz battles",
      category: "Quizzes"
    },
    {
      id: 4,
      name: "Best Coder - Hackathon",
      icon: Trophy,
      earned: true,
      condition: "Achieve 'Best Coder' title in any hackathon",
      category: "Competitions"
    },
    {
      id: 5,
      name: "Ideation Mastermind",
      icon: Award,
      earned: false,
      condition: "Present the most innovative idea in an ideathon",
      category: "Competitions"
    },
    {
      id: 6,
      name: "Top Scorer - Quiz Battle",
      icon: Trophy,
      earned: true,
      condition: "Score highest in any quiz event",
      category: "Quizzes"
    },
    {
      id: 7,
      name: "Webinar Participation",
      icon: Medal,
      earned: true,
      condition: "Attend 3 online webinars",
      category: "Webinars"
    },
    {
      id: 8,
      name: "Conference Attendee",
      icon: Star,
      earned: false,
      condition: "Participate in any technical conference",
      category: "Conferences"
    },
    {
      id: 9,
      name: "Quiz Duel Legend",
      icon: Trophy,
      earned: false,
      condition: "Win 10 quiz duels",
      category: "Quizzes"
    },
    {
      id: 10,
      name: "Best Innovator - Ideathon",
      icon: Award,
      earned: true,
      condition: "Win 'Best Innovator' in any ideathon",
      category: "Competitions"
    },
    {
      id: 11,
      name: "Tech Talk Specialist",
      icon: Medal,
      earned: true,
      condition: "Deliver or attend 5 technical webinars",
      category: "Webinars"
    },
    {
      id: 12,
      name: "Conference Veteran",
      icon: Star,
      earned: false,
      condition: "Attend 3 or more technical conferences",
      category: "Conferences"
    },
    {
      id: 13,
      name: "Hackathon Legend",
      icon: Trophy,
      earned: true,
      condition: "Win 3 hackathons",
      category: "Competitions"
    },
    {
      id: 14,
      name: "Pioneer of Ideas - Ideathon",
      icon: Award,
      earned: true,
      condition: "Be recognized for the most original idea in an ideathon",
      category: "Competitions"
    }
  ];
  
  // Group badges by category
  const groupedBadges = badges.reduce((acc, badge) => {
    if (!acc[badge.category]) {
      acc[badge.category] = [];
    }
    acc[badge.category].push(badge);
    return acc;
  }, {});

  // Calculate stats per category
  const categoryStats = Object.entries(groupedBadges).map(([category, categoryBadges]) => ({
    category,
    earned: categoryBadges.filter(badge => badge.earned).length,
    total: categoryBadges.length
  }));

  // Toggle category expansion
  const toggleCategory = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  // Handle mouse over for smart tooltip positioning
  const handleMouseOver = (e, badgeId) => {
    if (!containerRef.current) return;

    const badgeElement = e.currentTarget;
    const containerRect = containerRef.current.getBoundingClientRect();
    const badgeRect = badgeElement.getBoundingClientRect();
    
    // Calculate the position relative to viewport
    const relativeTop = badgeRect.top - containerRect.top;
    const relativeBottom = containerRect.bottom - badgeRect.bottom;
    
    // Determine whether to show tooltip above or below
    // If badge is in top 30% of container, show tooltip below
    const position = relativeTop < containerRect.height * 0.3 ? 'bottom' : 'top';
    
    setTooltipPosition({
      id: badgeId,
      position
    });
  };

  return (
    <div ref={containerRef} className="bg-white rounded-xl p-4 shadow-md border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">

          <h1 className="text-lg font-bold text-slate-800">Badges</h1>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full text-xs font-medium">
          <span className="text-indigo-600">{badges.filter(badge => badge.earned).length}</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-500">{badges.length}</span>
        </div>
      </div>

      <div className="space-y-3">
        {categoryStats.map(({ category, earned, total }) => (
          <div key={category} className="relative">
            <div 
              onClick={() => toggleCategory(category)}
              className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                <span className="font-medium text-sm text-slate-700">{category}</span>
                <div className="bg-white text-xs px-2 py-0.5 rounded-full shadow-sm border border-slate-100">
                  <span className="text-indigo-600">{earned}</span>
                  <span className="text-slate-400">/</span>
                  <span className="text-slate-500">{total}</span>
                </div>
              </div>
              <div className="text-slate-500">
                {expandedCategory === category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
            
            {/* Expandable badge grid */}
            <div 
              className={`grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
                expandedCategory === category ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              {groupedBadges[category].map((badge) => (
                <div 
                  key={badge.id} 
                  className="group relative" 
                  onMouseEnter={(e) => handleMouseOver(e, badge.id)}
                >
                  <div 
                    className={`flex flex-col items-center justify-center p-2 rounded-lg ${
                      badge.earned 
                        ? "bg-white shadow-sm border border-slate-100" 
                        : "bg-slate-50 border border-slate-200 opacity-50"
                    }`}
                  >
                    <div className="relative mb-1">
                      {badge.earned && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                      <badge.icon 
                        className={`w-5 h-5 ${
                          badge.earned ? "text-indigo-600" : "text-slate-400"
                        }`}
                      />
                    </div>
                    <span className={`text-center text-xs font-medium truncate w-full ${
                      badge.earned ? "text-slate-700" : "text-slate-500"
                    }`}>
                      {badge.name}
                    </span>
                  </div>
                  
                  {/* Smart positioning tooltip */}
                  <div 
                    className={`absolute opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-10 left-1/2 transform -translate-x-1/2 ${
                      tooltipPosition.id === badge.id && tooltipPosition.position === 'bottom'
                        ? 'top-full mt-1'
                        : 'bottom-full mb-1'
                    }`}
                  >
                    <div className="bg-slate-800 text-white text-xs p-1.5 rounded shadow-lg max-w-xs whitespace-normal text-center">
                      {badge.condition}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-4">
        <button 
          onClick={() => expandedCategory ? setExpandedCategory(null) : setExpandedCategory(categoryStats[0].category)}
          className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
        >
          {expandedCategory ? (
            <>
              <ChevronUp size={14} />
              <span>Collapse All</span>
            </>
          ) : (
            <>
              <ChevronDown size={14} />
              <span>Expand All</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BadgesComponent;