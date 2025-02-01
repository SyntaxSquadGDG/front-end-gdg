import ErrorBoundary from '@app/_components/(dashboard)/general/error-boundary';
import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import LoadError from '@app/_components/(dashboard)/general/load-error';
import LoadErrorDiv from '@app/_components/(dashboard)/general/load-error-div';
import LoadingSpinner from '@app/_components/(dashboard)/general/loader';
import RefetchButton from '@app/_components/(dashboard)/general/refetch';
import TryLater from '@app/_components/(dashboard)/general/try-later';
import ChangePassword from '@app/_components/(dashboard)/profile/change-password';
import { fetchUserPersonalInfo } from '@app/_components/(dashboard)/profile/data/queries';
import ImageSection from '@app/_components/(dashboard)/profile/image';
import ImageUpload from '@app/_components/(dashboard)/profile/image-upload';
import PersonalInfo from '@app/_components/(dashboard)/profile/personal';
import HelpSVG from '@app/_components/svgs/profile/help';
import { decodeJWT } from '@app/_utils/auth';
import { getErrorText } from '@app/_utils/translations';
import { refetchProfile } from '@app/actions';
import { getCookie } from 'cookies-next';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React, { Suspense } from 'react';

const page = async () => {
  const t = await getTranslations();

  const items = [{ text: t('profile.profile'), href: '/profile' }];

  const UserDataWrapper = async () => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('token');
      const decodedToken = token ? decodeJWT(token.value) : null;
      const user = decodedToken.payload;

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
      return (
        <LoadErrorDiv>
          <LoadError>{errorText}</LoadError>
          <RefetchButton refetch={refetchProfile} />
        </LoadErrorDiv>
      );
    }
  };

  return (
    <div>
      <ErrorBoundary>
        <HeadBar items={items}>
          <Link href={'/help'} className="hover:opacity-70 duration-500">
            <HelpSVG />
          </Link>
        </HeadBar>
      </ErrorBoundary>
      <div className="flex flex-col gap-32px">
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

