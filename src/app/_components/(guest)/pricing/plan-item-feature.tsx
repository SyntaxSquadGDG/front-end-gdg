import React from 'react';
import Checkbox from '../common/checkbox';

const PlanItemFeature = ({ text }) => {
  return (
    <div className="flex items-center gap-12px">
      <Checkbox alwaysTrue={true} />
      <p className="text-16px font-medium">{text}</p>
    </div>
  );
};

export default PlanItemFeature;

