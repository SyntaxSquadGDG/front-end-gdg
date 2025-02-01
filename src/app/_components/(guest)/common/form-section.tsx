'use client';
import React from 'react';

const FormSection = ({ children }) => {
  return (
    <div className="minHeightSection py-40px">
      <div className="container">
        <div className="relative  minHeightFormSection mx-auto h-[100%] rounded-[30px] py-36px px-24px xs:px-[60px] overflow-hidden">
          <div className="bg-guestLinear w-[100%] h-[100%] minHeightFormSection absolute top-0 left-0 z-[1px]" />
          <div className="relative z-5 minHeightFormSection flex flex-col items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSection;

