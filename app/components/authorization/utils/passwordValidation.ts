export const handlePasswordCheck = (password: string): string | null => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  if (!hasUpperCase) {
    return 'Password must contain at least one uppercase letter.';
  }

  if (!hasNumber) {
    return 'Password must contain at least one number.';
  }

  if (!hasSpecialChar) {
    return 'Password must contain at least one special character';
  }

  return null;
};
