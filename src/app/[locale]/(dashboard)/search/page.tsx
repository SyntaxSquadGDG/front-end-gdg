import SearchResults from '@app/_components/(dashboard)/search/results';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async ({ searchParams }) => {
  const search = (await searchParams).q;

  console.log(search);

  const t = await getTranslations();
  return (
    <div>
      <SearchResults />
    </div>
  );
};

export default page;

