import SearchResults from '@app/_components/(dashboard)/search/results';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async ({ searchParams }) => {
  const query = (await searchParams).q;

  return (
    <div>
      <SearchResults query={query} />
    </div>
  );
};

export default page;

