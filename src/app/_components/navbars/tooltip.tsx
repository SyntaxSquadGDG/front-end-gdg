'use client';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import ReactDOM from 'react-dom';

const Tooltip = ({ linkRef, text }) => {
  const tooltipVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed bg-secondaryColor1 lg:hidden text-textLight font-medium text-14px px-16px py-4px rounded font-content z-[5000]"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={tooltipVariants}
        transition={{ duration: 0.3 }}
        style={{
          top:
            (linkRef.current.getBoundingClientRect().top +
              linkRef.current.getBoundingClientRect().bottom) /
            2,
          left: linkRef.current.getBoundingClientRect().right + 16,
          transform: 'translateY(-50%)', // Center the tooltip
          zIndex: 999999999999999,
        }}>
        {text}
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
};

export default Tooltip;

