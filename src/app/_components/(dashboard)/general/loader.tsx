import clsx from 'clsx';

export default function LoadingSpinner({ full = false, alignStart = false }) {
  return (
    <div
      className={clsx(
        'flex items-center my-[16px]',
        alignStart ? 'justify-start' : 'justify-center',
        full ? 'h-[calc(100vh-var(--horizontalNavHeight))]' : '',
      )}>
      <div className="w-12 h-12 border-4 border-t-transparent border-mainColor1 rounded-full animate-spin"></div>
    </div>
  );
}

