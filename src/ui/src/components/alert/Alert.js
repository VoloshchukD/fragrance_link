import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const Alert = ({ message, type = "success", duration = 2000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`alert alert-${type}`} role="alert">
      <span>{message}</span>
      <button type="button" className="btn" onClick={onClose}>
        <IoMdClose />
      </button>
    </div>
  );
};

export default Alert;
