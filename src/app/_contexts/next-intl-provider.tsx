'use client';

import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

// Create a provider component
export const NextIntlProvider = ({ messages, children, locale }) => {
  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      onError={() => console.log('AJ')}>
      {children}
    </NextIntlClientProvider>
  );
};

