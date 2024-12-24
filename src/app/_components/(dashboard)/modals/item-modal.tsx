'use client';
import { useModal } from '@app/_contexts/modal-provider';
import useClickOutside from '@app/_hooks/useclickoutside';
import React, { useRef } from 'react';

const ItemModal = ({ isOpen, setIsOpen, modalName, children }) => {
  const { openModal, closeModal, modalStack } = useModal();
  const popUpRef = useRef(null);
  useClickOutside(popUpRef, () => setIsOpen(false));
  return (
    <div>
      {isOpen && (
        <div
          ref={popUpRef}
          className="bg-whiteBackground shadow-tableShadow rounded-[16px] py-[24px] px-[24px] w-max absolute right-[16px] top-0 z-[50000000000000] flex flex-col gap-[24px]">
          {/* {modalName && (
            <button onClick={() => openModal(modalName)}>Delete</button>
          )} */}
          {children}
        </div>
      )}
    </div>
  );
};

export default ItemModal;

