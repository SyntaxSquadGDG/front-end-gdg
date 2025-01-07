'use client';

import { useTransition } from 'react';
import RetryIcon from './retry';
import LoadingSpinner from './loader';

const RefetchButton = ({ refetch }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => refetch())}
      disabled={isPending}>
      {isPending ? <LoadingSpinner /> : <RetryIcon />}
    </button>
  );
};

export default RefetchButton;

