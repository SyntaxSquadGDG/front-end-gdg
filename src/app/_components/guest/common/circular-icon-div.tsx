import React from 'react';

const CircularIconDiv = ({ SVG }) => {
  return (
    <div className="w-[108px] h-[108px] rounded-full border-[1px] border-solid border-[#F6F8FF] mx-auto flex items-center justify-center">
      <SVG />
    </div>
  );
};

export default CircularIconDiv;

