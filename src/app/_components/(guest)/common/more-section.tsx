import clsx from 'clsx';
import React from 'react';
import HeadText from './head';
import DescriptionText from './description';
import GuestButton from '@app/_components/(guest)/common/guest-button';
import ImageDiv from './image';

const MoreSection = async ({ head, description, buttonText, href, src }) => {
  return (
    <section className={clsx('relative')}>
      <div
        className={clsx(
          'relative z-[5px] container mx-auto flex items-center flex-col lg:flex-row',
          'gap-sectionGap py-sectionPadding',
        )}>
        <div className="w-[100%]">
          <HeadText variant="light">{head}</HeadText>
          <DescriptionText size={22}>{description}</DescriptionText>
          <GuestButton link={true} href={href} className={'w-[100%] lg:w-fit'}>
            {buttonText}
          </GuestButton>
        </div>
        <ImageDiv src={src} />
      </div>
    </section>
  );
};

export default MoreSection;

