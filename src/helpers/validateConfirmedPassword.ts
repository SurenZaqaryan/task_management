export const validateConfirmedPassword = (password: string, confirmedPassword: string): boolean => {
  return password.trim() === confirmedPassword.trim();
};
