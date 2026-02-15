/**
 * Formats a number as USD Currency
 * @param {number} amount 
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Generates a random ID for UI keys (when no DB ID exists)
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Calculates BMI
 * @param {number} weightKg 
 * @param {number} heightCm 
 */
export const calculateBMI = (weightKg, heightCm) => {
  if (!weightKg || !heightCm) return 0;
  const heightM = heightCm / 100;
  return (weightKg / (heightM * heightM)).toFixed(1);
};