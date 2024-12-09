import About from '@app/_components/guest/home/about';
import Demo from '@app/_components/guest/home/demo';
import Download from '@app/_components/guest/home/download';
import Landing from '@app/_components/guest/home/landing';
import Services from '@app/_components/guest/home/services';
import Services2 from '@app/_components/guest/home/services2';
import Solutions from '@app/_components/guest/home/solutions';
import React from 'react';

const page = () => {
  return (
    <div>
      <Landing />
      <Services />
      <Services2 />
      <About />
      <Solutions />
      <Download />
      <Demo />
    </div>
  );
};

export default page;

