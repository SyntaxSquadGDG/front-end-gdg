'use client';
import { useModal } from '@app/_contexts/modal-provider';
import useClickOutside from '@app/_hooks/useclickoutside';
import React, { useRef } from 'react';

const ItemModal = ({ isOpen, setIsOpen, modalName }) => {
  const { openModal, closeModal, modalStack } = useModal();
  const popUpRef = useRef(null);
  useClickOutside(popUpRef, () => setIsOpen(false));
  return (
    <div>
      {isOpen && (
        <div
          ref={popUpRef}
          className="absolute right-0 p-[24px] bg-slate-200 rounded-[16px] shadow-tableShadow">
          <button onClick={() => openModal(modalName)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ItemModal;

