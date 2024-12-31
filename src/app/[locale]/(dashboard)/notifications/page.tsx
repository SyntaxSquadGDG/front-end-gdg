import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import MarkAsReadButton from '@app/_components/(dashboard)/notifications/mark-as-read-button';
import NotificationItem from '@app/_components/(dashboard)/notifications/notification-item';
import Notifications from '@app/_components/(dashboard)/notifications/notifications';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  const items = [{ text: t('notifications.head'), href: '/notifications' }];


  return (
    <div className="">
      <HeadBar items={items}>
        <MarkAsReadButton />
      </HeadBar>
      <Notifications />
    </div>
  );
};

export default page;

