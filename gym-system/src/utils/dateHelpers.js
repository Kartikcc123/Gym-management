/**
 * Returns a greeting based on current time
 * @returns {string} "Good Morning", "Good Afternoon", or "Good Evening"
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

/**
 * Formats a date string to "Jan 01, 2024"
 * @param {string|Date} date 
 */
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Calculates days remaining until a specific date
 * Useful for "Subscription expires in X days"
 * @param {string|Date} targetDate 
 */
export const getDaysRemaining = (targetDate) => {
  const total = Date.parse(targetDate) - Date.parse(new Date());
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
};