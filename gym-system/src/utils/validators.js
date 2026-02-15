export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const isStrongPassword = (password) => {
  // Min 6 chars, at least one number
  return password.length >= 6 && /\d/.test(password);
};

export const validateRegistration = (data) => {
  const errors = {};
  
  if (!data.name || data.name.length < 2) {
    errors.name = "Name is too short";
  }
  
  if (!isValidEmail(data.email)) {
    errors.email = "Invalid email address";
  }
  
  if (!isStrongPassword(data.password)) {
    errors.password = "Password must be 6+ chars and include a number";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};