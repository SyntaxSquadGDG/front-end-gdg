import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import MarkAsReadButton from '@app/_components/(dashboard)/notifications/mark-as-read-button';
import NotificationItem from '@app/_components/(dashboard)/notifications/notification-item';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  const items = [{ text: t('notifications.head'), href: '/notifications' }];

  const notifications = [
    {
      head: 'Available Storage Is Running Low.',
      description:
        'Your available storage is running low. Free up space by managing your files or upgrade to a larger plan to ensure uninterrupted access and functionality.',
      time: 'Today , 09:10 AM',
    },
    {
      head: 'Available Storage Is Running Low.',
      description:
        'Your available storage is running low. Free up space by managing your files or upgrade to a larger plan to ensure uninterrupted access and functionality.',
      time: 'Today , 09:10 AM',
    },
    {
      head: 'Available Storage Is Running Low.',
      description:
        'Your available storage is running low. Free up space by managing your files or upgrade to a larger plan to ensure uninterrupted access and functionality.',
      time: 'Today , 09:10 AM',
    },
    {
      head: 'Available Storage Is Running Low.',
      description:
        'Your available storage is running low. Free up space by managing your files or upgrade to a larger plan to ensure uninterrupted access and functionality.',
      time: 'Today , 09:10 AM',
    },
    {
      head: 'Available Storage Is Running Low.',
      description:
        'Your available storage is running low. Free up space by managing your files or upgrade to a larger plan to ensure uninterrupted access and functionality.',
      time: 'Today , 09:10 AM',
    },
    {
      head: 'Available Storage Is Running Low.',
      description:
        'Your available storage is running low. Free up space by managing your files or upgrade to a larger plan to ensure uninterrupted access and functionality.',
      time: 'Today , 09:10 AM',
    },
    {
      head: 'Available Storage Is Running Low.',
      description:
        'Your available storage is running low. Free up space by managing your files or upgrade to a larger plan to ensure uninterrupted access and functionality.',
      time: 'Today , 09:10 AM',
    },
    {
      head: 'Available Storage Is Running Low.',
      description:
        'Your available storage is running low. Free up space by managing your files or upgrade to a larger plan to ensure uninterrupted access and functionality.',
      time: 'Today , 09:10 AM',
    },
  ];

  return (
    <div className="">
      <HeadBar items={items}>
        <MarkAsReadButton />
      </HeadBar>
      <div className="flex flex-col gap-[32px]">
        {notifications.map((notification, index) => {
          return (
            <React.Fragment key={index}>
              <NotificationItem
                description={notification.description}
                head={notification.head}
                time={notification.time}
              />
              <div className="bg-secondText opacity-35 h-[1px] w-[100%]" />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default page;

