'use client';

import { contentFont } from '@/app/_utils/fonts';
import CloseModalSVG from '@app/_components/svgs/general/close-modal';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';
import CloseModalButton from './close-modal-button';

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
  innerClassName = '',
  noOutside,
  ...props
}) {
  const modalRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (!noOutside) {
      onClose(); // Close modal on outside click
    }
  };

  // Define animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1 },
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...props}
          ref={modalRef}
          onClick={handleOutsideClick}
          className={clsx(
            'fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm',
            className,
          )}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.3 }}>
          <motion.div
            className={clsx(
              'bg-whiteBackground mx-16px rounded-[16px] py-36px px-48px max-xs:px-16px max-h-[98vh] overflow-y-auto w-[460px] relative',
              innerClassName,
            )}
            onClick={(e) => e.stopPropagation()}>
            {children}
            <CloseModalButton onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

