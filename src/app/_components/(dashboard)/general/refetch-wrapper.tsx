'use client';

import React from 'react';
import RefetchButton from './refetch';
import { refetchTag } from '@app/actions';

const RefetchWrapper = ({ tag }) => {
  return <RefetchButton refetch={() => refetchTag(tag)} />;
};

export default RefetchWrapper;

