import React from "react";

const Modal = ({ isOpen, onClose, children, onSave, formText }) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {formText.title}
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              {formText.cancel}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onSave();
              }}
            >
              {formText.submit}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
