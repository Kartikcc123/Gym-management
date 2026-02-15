/**
 * Formats a number into a currency string.
 * Supports USD and INR (Indian Rupee) formatting.
 * * @param {number} amount - The numeric amount (e.g., 12000)
 * @param {string} currency - 'USD' or 'INR' (Default: 'USD')
 * @returns {string} - Formatted string (e.g., "$12,000" or "₹12,000")
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (isNaN(amount) || amount === null) return '$0';

  // Determine locale based on currency for correct comma placement
  // 'en-IN' handles lakhs/crores (1,00,000)
  // 'en-US' handles millions (100,000)
  const locale = currency === 'INR' ? 'en-IN' : 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0, // Keep it clean (no .00) unless necessary
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formats large numbers for compact display (Dashboard Stats)
 * Example: 1500 -> "1.5k", 1000000 -> "1M"
 */
export const formatCompactNumber = (number) => {
  return new Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(number);
};

export default formatCurrency;