'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React, { useId } from 'react';

const Input = ({
  readOnly,
  value,
  label,
  placeHolder,
  type = 'text',
  error,
  ...rest
}) => {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-[16px]">
      <label className="text-textDark text-[18px]" htmlFor={inputId}>
        {label}
      </label>

      <input
        type={type}
        defaultValue={value}
        readOnly={readOnly}
        id={inputId}
        placeholder={placeHolder}
        className={clsx(
          readOnly && 'read-only',
          'rounded-[8px] p-[16px] text-[16px] font-normal text-black border-[1px] border-solid border-mainColor3 w-[100%] outline-none',
          contentFont.className,
        )}
        {...rest}
      />

      {error && (
        <p className="text-errorColor font-medium text-[14px]">{error}</p>
      )}
    </div>
  );
};

export default Input;

