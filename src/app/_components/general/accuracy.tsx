import React from 'react';

const AccuracyLevel = ({ accuracy }) => {
  if (accuracy < 50) {
    return (
      <div className="bg-[#930B0B] rounded-[16px] p-[12px] w-[180px] text-textLight">
        Not Accurate
      </div>
    );
  }

  return (
    <div className="bg-[#0B9318] rounded-[16px] p-[12px] w-[180px] text-textLight">
      Accurate
    </div>
  );
};

export default AccuracyLevel;

