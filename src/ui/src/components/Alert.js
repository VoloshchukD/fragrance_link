import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const Alert = ({ message, duration = 2000, trigger }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger === 0) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [trigger]);

  if (!visible) return null;

  return (
    <div className="alert alert-primary" role="alert">
      <span>{message}</span>
      <button type="button" className="btn" onClick={() => setVisible(false)}>
        <IoMdClose />
      </button>
    </div>
  );
};

export default Alert;
