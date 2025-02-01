'use client';

import clsx from 'clsx';
import React from 'react';
import HeadText from './head';
import DescriptionText from './description';
import GuestButton from '@app/_components/(guest)/common/guest-button';
import ImageDiv from './image';
import Transition from '@app/_components/transitions/transitions';

const MoreSection = ({ head, description, buttonText, href, src }) => {
  return (
    <section className={clsx('relative')}>
      <div
        className={clsx(
          'relative z-[5px] container mx-auto flex items-center flex-col lg:flex-row',
          'gap-sectionGap py-sectionPadding',
        )}>
        <div className="w-[100%]">
          <Transition from={'left'}>
            <HeadText variant="light">{head}</HeadText>
          </Transition>
          <Transition from={'left'} delay={0.1}>
            <DescriptionText size={22}>{description}</DescriptionText>
          </Transition>
          <Transition from={'left'} delay={0.15}>
            <GuestButton
              link={true}
              href={href}
              className={'w-[100%] lg:w-fit'}>
              {buttonText}
            </GuestButton>
          </Transition>
        </div>
        <Transition from={'right'} className="w-full">
          <ImageDiv src={src} alt="Demo" />
        </Transition>
      </div>
    </section>
  );
};

export default MoreSection;

