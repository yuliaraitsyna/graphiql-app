import React, {useEffect} from 'react';
import {toast} from 'react-toastify';

interface Errors {
  [key: string]: string;
}

interface Props {
  errors: Errors;
}

const ErrorHandler: React.FC<Props> = ({errors}) => {
  useEffect(() => {
    const lastErrorKey = Object.keys(errors).pop();
    if (lastErrorKey && errors[lastErrorKey]) {
      toast.error(errors[lastErrorKey]);
    }
  }, [errors]);

  return null;
};

export default ErrorHandler;
