export const validatePassword = (password: string): boolean => {
  return password.trim().length >= 8;
};
