'use client';

import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
  ...props
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose(); // Close modal on outside click
      }
    };

    // Disable scrolling on body when the modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.body.style.overflow = ''; // Restore scrolling on unmount
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      {...props}
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50',
        className,
      )}>
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 relative overflow-y-auto max-h-[90vh]">
        {children}
      </div>
    </div>,
    document.body,
  );
}

