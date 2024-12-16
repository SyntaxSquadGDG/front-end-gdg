import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';

const ScoreText = ({ score }) => {
  const className = clsx('text-[18px] font-bold', contentFont.className);
  if (score >= 50) {
    return <p className={clsx(className, 'text-highColor')}>{score} %</p>;
  }
  return <p className={clsx(className, 'text-lowColor')}>{score} %</p>;
};

export default ScoreText;

