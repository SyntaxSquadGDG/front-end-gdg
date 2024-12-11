import Demo from '@app/_components/guest/services/demo';
import Features from '@app/_components/guest/services/features';
import Landing from '@app/_components/guest/services/landing';
import React from 'react';

const page = () => {
  return (
    <div>
      <Landing />
      <Features />
      <Demo />
    </div>
  );
};

export default page;

