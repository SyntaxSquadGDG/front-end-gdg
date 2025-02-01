'use client';
import { useModal } from '@app/_contexts/modal-provider';
import useModalPosition from '@app/_hooks/use-modal-position';
import useClickOutside from '@app/_hooks/useclickoutside';
import React, { useRef } from 'react';

const ItemModal = ({ isOpen, setIsOpen, children }) => {
  const { openModal, closeModal, modalStack } = useModal();
  // const popUpRef = useRef(null);
  const modalRef = useModalPosition(isOpen);
  useClickOutside(modalRef, () => setIsOpen(false));
  return (
    <div>
      {isOpen && (
        <div
          ref={modalRef}
          className="bg-whiteBackground shadow-tableShadow rounded-[16px] w-max absolute left-[50%] -translate-x-1/2 top-full z-[99999] flex flex-col py-12px">
          {children}
        </div>
      )}
    </div>
  );
};

export default ItemModal;

