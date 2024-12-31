import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import ChangePassword from '@app/_components/(dashboard)/profile/change-password';
import { fetchUserPersonalInfo } from '@app/_components/(dashboard)/profile/data/queries';
import ImageSection from '@app/_components/(dashboard)/profile/image';
import ImageUpload from '@app/_components/(dashboard)/profile/image-upload';
import PersonalInfo from '@app/_components/(dashboard)/profile/personal';
import HelpSVG from '@app/_components/svgs/profile/help';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import React, { Suspense } from 'react';

const page = async () => {
  const t = await getTranslations();

  const items = [{ text: t('profile.profile'), href: '/profile' }];

  const UserDataWrapper = async () => {
    try {
      const user = await fetchUserPersonalInfo();

      return (
        <>
          <PersonalInfo data={user} />
        </>
      );
    } catch (error) {
      console.error('Error fetching employees:', error);
      return <TryLater>{t('zero.profile')}</TryLater>;
    }
  };

  return (
    <div>
      <HeadBar items={items}>
        <Link href={'/help'}>
          <HelpSVG />
        </Link>
      </HeadBar>
      <div className="flex flex-col gap-[32px]">
        {/* <ImageSection /> */}
        <ImageUpload initialImageUrl="/images/defaults/user.png" />
        <Suspense fallback={<LoadingSpinner />}>
          <UserDataWrapper />
        </Suspense>
        <ChangePassword />
      </div>
    </div>
  );
};

export default page;

