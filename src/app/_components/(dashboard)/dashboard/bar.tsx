'use client';
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useTranslations } from 'next-intl';

// Normalize the data to percentages based on the maximum value

const MyResponsiveBar = ({ data }) => {
  const t = useTranslations(); // Get translations using next-intl

  const normalizedData = data.map((d) => ({
    month: d.month,
    successful: (d.successful / 100) * 100, // Convert to percentage
  }));
  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <ResponsiveBar
          data={normalizedData}
          keys={['successful']} // Specify the keys you want to visualize
          indexBy="month" // The property to group the data by
          margin={{ top: 16, right: 16, bottom: 80, left: 60 }}
          padding={0.3}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          enableLabel={false} // Hide labels on the bars
          maxValue={100}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          borderRadius={6}
          defs={[
            {
              id: 'gradient',
              type: 'linearGradient',
              x1: '50%', // Center horizontally
              y1: '0%', // Start at the top
              x2: '50%', // Center horizontally
              y2: '100%', // End at the bottom
              colors: [
                { offset: 0, color: 'var(--mainColor1)' },
                { offset: 100, color: 'var(--mainColorBar)' },
              ],
            },
          ]}
          // Apply gradient for the bars
          fill={[
            {
              match: { id: 'successful' },
              id: 'gradient', // Apply gradient to the 'successful' key
            },
          ]}
          axisLeft={{
            tickValues: [0, 20, 40, 60, 80, 100], // Define tick values
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          enableGridX={false} // Disable vertical grid lines
          enableGridY={true} // Enable horizontal grid lines
          gridYValues={[0, 20, 40, 60, 80, 100]} // Show grid lines for Y-axis
          // Fixed domain for Y-axis
          scaleY={{
            type: 'linear',
            min: 0,
            max: 100, // Maximum value for the Y-axis
          }}
        />
      </div>
    </>
  );
};

export default MyResponsiveBar;

