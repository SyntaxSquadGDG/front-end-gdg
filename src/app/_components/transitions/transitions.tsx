'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import clsx from 'clsx';

const Transition = ({
  from,
  children,
  delay = 0,
  className = '',
  reanimate = false, // New prop to control reanimation behavior
}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // Track if the animation has happened

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0 && latest < 1) {
      // Start the delay timer if not already animating
      if (!shouldAnimate) {
        setTimeout(() => {
          setShouldAnimate(true);
        }, delay * 1000); // Convert delay to milliseconds
      }
    } else {
      // Reset animation state if reanimate is true
      if (reanimate) {
        setShouldAnimate(false);
      }
    }
  });

  useEffect(() => {
    if (shouldAnimate) {
      setInView(true);
      if (!reanimate) {
        setHasAnimated(true); // Mark animation as completed if reanimate is false
      }
    } else {
      setInView(false);
    }
  }, [shouldAnimate, reanimate]);

  const fromX = { x: from === 'left' ? '-100vw' : '100vw' };
  const fromY = { y: from === 'up' ? '-100vh' : '100vh' };
  const toX = { x: inView ? '0vw' : from === 'left' ? '-100vw' : '100vw' };
  const toY = { y: inView ? '0vh' : from === 'up' ? '-100vh' : '100vh' };

  return (
    <motion.div
      className={clsx(className, !inView && 'opacity-0 pointer-events-none')}
      ref={ref}
      initial={from === 'left' || from === 'right' ? fromX : fromY}
      animate={from === 'left' || from === 'right' ? toX : toY}
      transition={{ duration: 0.75 }}>
      {children}
    </motion.div>
  );
};

export default Transition;

