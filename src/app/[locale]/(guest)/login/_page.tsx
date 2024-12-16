'use client';
import Checkbox from '@app/_components/(guest)/common/checkbox';
import Input from '@app/_components/(guest)/common/input';
import CustomSelect from '@app/_components/(guest)/common/select';
import PasswordSVG from '@app/_components/svgs/guest/forms/password';
import React, { useState } from 'react';

const page = () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const [selectedValue, setSelectedValue] = useState('');

  return (
    <div>
      <Input
        SVG={PasswordSVG}
        label={'Password'}
        type={'password'}
        placeHolder={'Password'}
        error={'Password Error'}
      />
      <Input
        SVG={PasswordSVG}
        label={'Name'}
        placeHolder={'Name'}
        type={'text'}
        error={'Name Error'}
      />
      <Checkbox label={'Remember Me'} />
      <CustomSelect
        label={'Business Type'}
        options={options}
        value={selectedValue}
        onChange={setSelectedValue}
        error={'ERROR'}
      />
    </div>
  );
};

export default page;

