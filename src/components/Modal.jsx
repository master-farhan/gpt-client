import React from "react";

const Modal = ({ isOpen, onClose, onSubmit, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-light/10 backdrop-blur-xs flex items-center justify-center z-50 transition-all">
      <div className="bg-light rounded-lg p-6 w-9/10 max-w-md">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        {children}
        <div className="flex justify-between gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-dark/10 hover:bg-dark/15 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
