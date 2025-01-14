import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

export const useNotification = () => {
  const { updateNotification } = useContext(NotificationContext);

  const notifySuccess = ({ message }) => {
    updateNotification({
      show: true,
      type: 'success',
      message
    });
  };

  const notifyError = ({ title, message }) => {
    updateNotification({
      show: true,
      type: 'danger',
      message
    });
  };

  return { notifySuccess, notifyError };
};