/**
 * Generate random streak data for heatmap visualization
 * @returns {Object} Object with dates as keys and intensity values (0-4) as values
 */
export function generateStreakData() {
    const data = {};
    const today = new Date();
    
    for (let i = 0; i < 90; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      // Random value for streak intensity: 0 = no login, 1-4 = login with different intensities
      data[dateString] = Math.random() > 0.3 ? Math.ceil(Math.random() * 4) : 0;
    }
    
    return data;
  }
  
  /**
   * Calculate streak stats
   * @param {Object} streakData - Object containing streak data
   * @returns {Object} Object containing streak statistics
   */
  export function calculateStreakStats(streakData) {
    // This is a placeholder for future implementation
    // Could calculate longest streak, average activity, etc.
    return {
      // Implementation details
    };
  }