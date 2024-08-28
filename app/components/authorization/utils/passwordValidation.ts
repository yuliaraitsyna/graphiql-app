export const handlePasswordCheck = (password: string): string | null => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  const hasUpperCase = /[\p{Lu}]/u.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[\p{S}\p{P}]/u.test(password);

  if (!hasUpperCase) {
    return 'Password must contain at least one uppercase letter (unicode is spported).';
  }

  if (!hasNumber) {
    return 'Password must contain at least one number (unicode is spported).';
  }

  if (!hasSpecialChar) {
    return 'Password must contain at least one special character (unicode is spported)';
  }

  return null;
};
