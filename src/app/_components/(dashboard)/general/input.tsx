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
  isPending = false,
  className,
  SVG,
  onChange = () => {},
  ...rest
}) => {
  const inputId = useId();

  return (
    <div className={clsx('flex flex-col gap-16px text-start', className)}>
      {label && (
        <label className="text-textDark text-18px" htmlFor={inputId}>
          {label}
        </label>
      )}

      <div
        className={clsx(
          'flex items-center gap-8px border-[1px] border-solid border-mainColor3 rounded-[8px] px-16px',
        )}>
        {SVG && <SVG />}
        <input
          type={type}
          defaultValue={value}
          readOnly={readOnly}
          id={inputId}
          disabled={isPending}
          placeholder={placeHolder}
          onChange={onChange}
          className={clsx(
            readOnly && 'opacity-50',
            'rounded-[8px] py-16px text-16px font-normal text-black w-[100%] outline-none',
            'font-content',
          )}
          {...rest}
        />
      </div>

      {error && (
        <p className="text-errorColor font-medium text-14px">{error}</p>
      )}
    </div>
  );
};

export default Input;

