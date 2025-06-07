import { useState, useEffect } from 'react';
import '../styles/Notification.css';

const Notification = ({ message, show, onClose }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    if (show) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!visible) return null;

  return (
    <div className="notification">
      <div className="notification-content">
        <span>✓</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Notification;