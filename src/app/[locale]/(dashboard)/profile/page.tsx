import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import ChangePassword from '@app/_components/(dashboard)/profile/change-password';
import ImageSection from '@app/_components/(dashboard)/profile/image';
import PersonalInfo from '@app/_components/(dashboard)/profile/personal';
import HelpSVG from '@app/_components/svgs/profile/help';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import React from 'react';

const page = async () => {
  const t = await getTranslations();

  const items = [{ text: t('profile.profile'), href: '/profile' }];
  return (
    <div>
      <HeadBar items={items}>
        <Link href={'/help'}>
          <HelpSVG />
        </Link>
      </HeadBar>
      <div className="flex flex-col gap-[32px]">
        <ImageSection />
        <PersonalInfo />
        <ChangePassword />
      </div>
    </div>
  );
};

export default page;

