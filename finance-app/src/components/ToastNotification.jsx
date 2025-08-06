import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const ToastNotification = ({ message, type = 'success' }) => {
  const location = useLocation();

  useEffect(() => {
    if (message) {
      toast[type](message);
    }
  }, [message, location.pathname, type]);

  return null;
};

export default ToastNotification;