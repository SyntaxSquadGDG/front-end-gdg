import React from 'react';

const ContactItem = ({ SVG, text }) => {
  return (
    <div className="flex items-center gap-[8px]">
      <SVG />
      <p className="text-[22px]">{text}</p>
    </div>
  );
};

export default ContactItem;

