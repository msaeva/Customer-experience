import { createContext } from "react";

const NotificationContext = createContext({
    active: true,
    message: "",
    severity: 'success' | 'error' | 'warning' | 'info'
});

export default NotificationContext;