import {green, orange, red} from '@mui/material/colors';

export enum PasswordStrength {
  STRONG = 'Strong',
  MEDIUM = 'Medium',
  WEAK = 'Weak',
}

export const handlePasswordCheck = (password: string) => {
  let strength: PasswordStrength = PasswordStrength.WEAK;
  if (password.length >= 8) {
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
      strength = PasswordStrength.STRONG;
    } else if (/[A-Z]/.test(password) || /[0-9]/.test(password) || /[!@#$%^&*]/.test(password)) {
      strength = PasswordStrength.MEDIUM;
    }
  }
  return strength;
};

export const getPasswordStrengthColor = (passwordStrength: PasswordStrength) => {
  switch (passwordStrength) {
    case PasswordStrength.STRONG:
      return green[500];
    case PasswordStrength.MEDIUM:
      return orange[500];
    case PasswordStrength.WEAK:
      return red[500];
    default:
      return '';
  }
};

export const getHelperPasswordMessage = (passwordStrength: PasswordStrength) => {
  switch (passwordStrength) {
    case PasswordStrength.STRONG:
      return '';
    case PasswordStrength.MEDIUM:
      return 'Password must contain at least one upper letter and char';
    case PasswordStrength.WEAK:
      return 'Password must contain at least one number and char';
    default:
      return '';
  }
};
