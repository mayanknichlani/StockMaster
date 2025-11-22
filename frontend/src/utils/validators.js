export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePassword = (pwd) => pwd.length >= 8;
export const validateRequired = (val) => val !== null && val !== undefined && val !== '';