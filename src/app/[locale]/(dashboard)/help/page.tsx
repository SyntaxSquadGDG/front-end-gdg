import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import Chat from '@app/_components/(dashboard)/help/chat';
import { fetchUserPersonalInfo } from '@app/_components/(dashboard)/profile/data/queries';
import HelpSVG from '@app/_components/svgs/profile/help';
import { contentFont } from '@app/_utils/fonts';
import { getErrorText } from '@app/_utils/translations';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  const items = [{ text: t('help.head'), href: '/help' }];

  const UserChatWrapper = async () => {
    let user;
    try {
      user = await fetchUserPersonalInfo();
    } catch (error) {
      user = {
        img: '/public/images/defaults/default-user.jpg',
      };
    }
    return <Chat user={user} />;
  };

  return (
    <div>
      <HeadBar items={items}>
        <Link href={'/help'}>
          <HelpSVG />
        </Link>
      </HeadBar>
      <p className={clsx('mb-[32px] text-[22px] ', contentFont.className)}>
        {t('help.description')}
      </p>
      <UserChatWrapper />
    </div>
  );
};

export default page;

