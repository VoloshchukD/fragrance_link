import { createContext, useContext, useState } from "react";
import Alert from "./Alert";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <NotificationContext.Provider value={{ showAlert }}>
      {alert && (
        <Alert message={alert.message} type={alert.type} onClose={closeAlert} />
      )}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
