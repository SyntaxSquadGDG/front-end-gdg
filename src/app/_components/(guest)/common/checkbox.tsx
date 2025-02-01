'use client';
import CheckedCheckboxSVG from '@app/_components/svgs/guest/forms/checked-checkbox';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React, { useId } from 'react';

const Checkbox = ({
  alwaysTrue = false,
  label,
  value,
  onChange,
  disabled = false,
}) => {
  const checkboxId = useId();

  return (
    <>
      <input
        type="checkbox"
        id={checkboxId}
        disabled={disabled}
        checked={alwaysTrue ? true : value ? value : false}
        className="hidden"
        onChange={alwaysTrue ? () => {} : (e) => onChange(e.target.checked)}
      />
      <div
        className={clsx(
          'font-content',
          'flex items-center gap-8px',
          disabled && 'cursor-not-allowed',
        )}>
        <div
          className={clsx(
            'w-[24px] h-[24px] border-[2px] border-solid border-white relative rounded-[4px]',
            (value || alwaysTrue) && 'bg-goldLinear border-none',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          )}
          onClick={alwaysTrue || disabled ? () => {} : () => onChange(!value)}>
          {(value || alwaysTrue) && (
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <CheckedCheckboxSVG />
            </div>
          )}
        </div>
        <label
          className={clsx(
            'text-18px text-textLight',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          )}
          htmlFor={checkboxId}>
          {label}
        </label>
      </div>
    </>
  );
};

export default Checkbox;

