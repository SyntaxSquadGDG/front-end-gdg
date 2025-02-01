'use client';
import { useEffect, useRef } from 'react';

const useModalPosition = (isOpen) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const modal = modalRef.current;
      const rect = modal.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Helper function to calculate the percentage of the modal that is out of bounds
      const calculateLoss = (left, right) => {
        const leftOut = Math.max(0, -left); // How much the modal is outside the left edge
        const rightOut = Math.max(0, right - viewportWidth); // How much the modal is outside the right edge
        return ((leftOut + rightOut) / rect.width) * 100; // Total out-of-bounds percentage
      };

      // Save the original position and styles
      const originalStyles = {
        position: modal.style.position,
        left: modal.style.left,
        right: modal.style.right,
        transform: modal.style.transform,
      };

      // Temporarily position the modal to calculate losses for each alignment
      const calculateAlignmentLoss = (alignment) => {
        if (alignment === 'center') {
          modal.style.left = '50%';
          modal.style.right = 'auto';
          modal.style.transform = 'translateX(-50%)';
        } else if (alignment === 'left') {
          modal.style.left = '16px';
          modal.style.right = 'auto';
          modal.style.transform = 'translateX(0)';
        } else if (alignment === 'right') {
          modal.style.left = 'auto';
          modal.style.right = '16px';
          modal.style.transform = 'translateX(0)';
        }

        // Force the browser to recalculate the layout
        modal.getBoundingClientRect();

        // Calculate the loss for this alignment
        const newRect = modal.getBoundingClientRect();
        return {
          loss: calculateLoss(newRect.left, newRect.right),
          rect: newRect,
        };
      };

      // Calculate the loss for each alignment
      const center = calculateAlignmentLoss('center');
      const left = calculateAlignmentLoss('left');
      const right = calculateAlignmentLoss('right');

      // Reset the modal to its original position
      modal.style.position = originalStyles.position;
      modal.style.left = originalStyles.left;
      modal.style.right = originalStyles.right;
      modal.style.transform = originalStyles.transform;

      // Determine the best alignment based on the least loss and priority
      const losses = [
        { alignment: 'center', loss: center.loss, rect: center.rect },
        { alignment: 'left', loss: left.loss, rect: left.rect },
        { alignment: 'right', loss: right.loss, rect: right.rect },
      ];

      // Sort by loss (ascending) and then by priority (centering > left > right)
      losses.sort((a, b) => {
        if (a.loss === b.loss) {
          // Priority: center > left > right
          const priority = { center: 0, left: 1, right: 2 };
          return priority[a.alignment] - priority[b.alignment];
        }
        return a.loss - b.loss;
      });

      // Apply the best alignment
      const bestAlignment = losses[0].alignment;
      const bestRect = losses[0].rect;

      if (bestAlignment === 'center') {
        modal.style.left = '50%';
        modal.style.right = 'auto';
        modal.style.transform = 'translateX(-50%)';

        // Fine-tune the position based on the loss
        const leftOut = Math.max(0, -bestRect.left); // How much the modal is outside the left edge
        const rightOut = Math.max(0, bestRect.right - viewportWidth); // How much the modal is outside the right edge

        if (leftOut > 0) {
          // Move the modal to the right by the amount it's out of bounds on the left
          modal.style.transform = `translateX(calc(-50% + ${leftOut}px))`;
        } else if (rightOut > 0) {
          // Move the modal to the left by the amount it's out of bounds on the right
          modal.style.transform = `translateX(calc(-50% - ${rightOut}px))`;
        }
      } else if (bestAlignment === 'left') {
        modal.style.left = '16px';
        modal.style.right = 'auto';
        modal.style.transform = 'translateX(0)';

        // Fine-tune the position based on the loss
        const rightOut = Math.max(0, bestRect.right - viewportWidth); // How much the modal is outside the right edge

        if (rightOut > 0) {
          // Move the modal to the left by the amount it's out of bounds on the right
          modal.style.left = `calc(16px - ${rightOut}px)`;
        }
      } else if (bestAlignment === 'right') {
        modal.style.left = 'auto';
        modal.style.right = '16px';
        modal.style.transform = 'translateX(0)';

        // Fine-tune the position based on the loss
        const leftOut = Math.max(0, -bestRect.left); // How much the modal is outside the left edge

        if (leftOut > 0) {
          // Move the modal to the right by the amount it's out of bounds on the left
          modal.style.right = `calc(16px - ${leftOut}px)`;
        }
      }
    }
  }, [isOpen]);

  return modalRef;
};

export default useModalPosition;
