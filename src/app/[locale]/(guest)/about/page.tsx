import Accelerated from '@app/_components/guest/about/accelerated';
import Different from '@app/_components/guest/about/different';
import Landing from '@app/_components/guest/about/landing';
import Statistics from '@app/_components/guest/about/statistics';
import React from 'react';

const page = () => {
  return (
    <div>
      <Landing />
      <Accelerated />
      <Different />
      <Statistics />
    </div>
  );
};

export default page;

