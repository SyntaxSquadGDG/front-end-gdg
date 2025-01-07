'use client';
import clsx from 'clsx';

export default function RetryIcon({ onClick, disabled = false, size = 'md' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'flex items-center justify-center rounded-full transition-all duration-300',
        'hover:bg-gray-200 dark:hover:bg-gray-700',
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:rotate-180',
        size === 'sm' && 'w-6 h-6 text-sm',
        size === 'md' && 'w-8 h-8 text-base',
        size === 'lg' && 'w-10 h-10 text-lg',
      )}
      aria-label="Retry">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M14 15L10 19L14 23" stroke="#222222" />
        <path
          d="M5.93782 15.5C5.14475 14.1264 4.84171 12.5241 5.07833 10.9557C5.31495 9.38734 6.07722 7.94581 7.24024 6.86729C8.40327 5.78877 9.8981 5.13721 11.4798 5.01935C13.0616 4.90149 14.6365 5.32432 15.9465 6.21856C17.2565 7.1128 18.224 8.42544 18.6905 9.94144C19.1569 11.4574 19.0947 13.0869 18.5139 14.5629C17.9332 16.0389 16.8684 17.2739 15.494 18.0656C14.1196 18.8573 12.517 19.1588 10.9489 18.9206"
          stroke="#222222"
          stroke-linecap="round"
        />
      </svg>
    </button>
  );
}

