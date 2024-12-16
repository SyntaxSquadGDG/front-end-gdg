'use client';
import HidePasswordSVG from '@app/_components/svgs/guest/forms/hide-password';
import ShowPasswordSVG from '@app/_components/svgs/guest/forms/show-password';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React, { useState, useId } from 'react';

const Input = ({ SVG, label, placeHolder, type, error, ...rest }) => {
  const [inputType, setInputType] = useState(type);
  const inputId = useId();

  function handleEyeClick(e) {
    e.preventDefault();
    if (inputType === 'text') {
      setInputType('password');
    } else {
      setInputType('text');
    }
  }

  return (
    <div className={clsx(contentFont.className, 'flex flex-col gap-[16px]')}>
      <label className="text-textLight text-[18px]" htmlFor={inputId}>
        {label}
      </label>
      <div className="flex items-center px-[16px] rounded-[16px] relative gradient-borders">
        <div className="shrink-0">{SVG && <SVG />}</div>
        {type === 'textarea' && (
          <textarea
            placeholder={placeHolder}
            id={inputId}
            className="bg-transparent outline-none text-textLight w-[100%] py-[20px] mx-[8px] placeholder:text-placeHolderColor resize-none min-h-[190px]"
            {...rest}></textarea>
        )}
        {type !== 'textarea' && (
          <input
            type={inputType}
            id={inputId}
            placeholder={placeHolder}
            className="bg-transparent outline-none text-textLight w-[100%] py-[20px] mx-[8px] placeholder:text-placeHolderColor"
            {...rest}
          />
        )}
        {type === 'password' && (
          <button onClick={handleEyeClick} className="shrink-0">
            {inputType === 'password' ? (
              <ShowPasswordSVG />
            ) : (
              <HidePasswordSVG />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-errorColor font-medium text-[14px]">{error}</p>
      )}
    </div>
  );
};

export default Input;

