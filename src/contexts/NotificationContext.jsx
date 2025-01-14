import { createContext, useState, useContext } from 'react';
import NotificationBar from '../components/NotificationBar';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    show: false,
    type: '',
    message: ''
  });
  
  const updateNotification = (newNotification) => {
    setNotification({ ...newNotification, show: false });
    setTimeout(() => setNotification({ ...newNotification, show: true }), 100);
  };

  return (
    <NotificationContext.Provider value={{ notification, updateNotification }}>
      {children}
      <NotificationBar
        show={notification.show}
        type={notification.type}
        message={notification.message}
      />
    </NotificationContext.Provider>
  );
};