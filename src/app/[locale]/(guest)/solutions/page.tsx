import Demo from '@app/_components/guest/solutions/demo';
import Landing from '@app/_components/guest/solutions/landing';
import Solutions from '@app/_components/guest/solutions/solutions';
import React from 'react';

const page = () => {
  return (
    <div>
      <Landing />
      <Solutions />
      <Demo />
    </div>
  );
};

export default page;

