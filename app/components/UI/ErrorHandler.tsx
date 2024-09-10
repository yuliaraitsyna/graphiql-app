import React, {useEffect} from 'react';
import {toast} from 'react-toastify';

interface Errors {
  [key: string]: string;
}

interface Props {
  errors: Errors;
  clearError: (name: string) => void;
}

const ErrorHandler: React.FC<Props> = ({errors, clearError}) => {
  useEffect(() => {
    const lastErrorKey = Object.keys(errors).pop();
    if (lastErrorKey && errors[lastErrorKey]) {
      toast.error(errors[lastErrorKey], {
        onClose: () => clearError(lastErrorKey),
      });
    }
  }, [errors, clearError]);

  return null;
};

export default ErrorHandler;
