import ErrorBoundary from '@app/_components/(dashboard)/general/error-boundary';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import ChangePassword from '@app/_components/(dashboard)/profile/change-password';
import { fetchUserPersonalInfo } from '@app/_components/(dashboard)/profile/data/queries';
import ImageSection from '@app/_components/(dashboard)/profile/image';
import ImageUpload from '@app/_components/(dashboard)/profile/image-upload';
import PersonalInfo from '@app/_components/(dashboard)/profile/personal';
import HelpSVG from '@app/_components/svgs/profile/help';
import { getErrorText } from '@app/_utils/translations';
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
          <ImageUpload initialImageUrl={user.img} />
          <PersonalInfo data={user} />
        </>
      );
    } catch (error) {
      const errorText = getErrorText(
        t,
        `profile.errors.${error?.message}`,
        `profile.errors.PERSONAL_INFO_ERROR`,
      );
      return <LoadError>{errorText}</LoadError>;
    }
  };

  return (
    <div>
      <ErrorBoundary>
        <HeadBar items={items}>
          <Link href={'/help'}>
            <HelpSVG />
          </Link>
        </HeadBar>
      </ErrorBoundary>
      <div className="flex flex-col gap-[32px]">
        {/* <ImageSection /> */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <UserDataWrapper />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <ChangePassword />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default page;

