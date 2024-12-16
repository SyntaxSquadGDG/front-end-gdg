import HeadBar from '@app/_components/(dashboard)/general/head-bar';
import Chat from '@app/_components/(dashboard)/help/chat';
import HelpSVG from '@app/_components/svgs/profile/help';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  const items = [{ text: t('help.head'), href: '/help' }];

  const messages = [
    {
      id: 1,
      type: 'customer',
      content: 'Hello!',
      time: '2024-09-19T08:00:00Z',
    },
    {
      id: 2,
      type: 'admin',
      content: 'Hi there!',
      time: '2024-09-19T08:01:30Z',
    },
    {
      id: 3,
      type: 'customer',
      content: 'I need help with my order.',
      time: '2024-09-19T08:05:00Z',
    },
    {
      id: 4,
      type: 'admin',
      content: 'Sure, I can assist you with that.',
      time: '2024-09-19T08:07:15Z',
    },
    {
      id: 5,
      type: 'customer',
      content: 'Can you provide the status of my order?',
      time: '2024-09-19T08:10:00Z',
    },
    {
      id: 6,
      type: 'admin',
      content: 'Let me check that for you.',
      time: '2024-09-19T08:12:30Z',
    },
    {
      id: 7,
      type: 'customer',
      content: 'Thank you!',
      time: '2024-09-19T08:15:00Z',
    },
    {
      id: 8,
      type: 'admin',
      content: 'Your order is currently being processed.',
      time: '2024-09-19T08:17:45Z',
    },
    {
      id: 9,
      type: 'customer',
      content: 'When will it be shipped?',
      time: '2024-09-19T08:20:00Z',
    },
    {
      id: 10,
      type: 'admin',
      content: 'It should be shipped by the end of the day.',
      time: '2024-09-19T08:22:30Z',
    },
    {
      id: 11,
      type: 'customer',
      content: 'Great, I appreciate the help!',
      time: '2024-09-19T08:25:00Z',
    },
  ];

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
      <Chat messages={messages} />
    </div>
  );
};

export default page;

