'use client';

import { ResponsivePie } from '@nivo/pie';

// const data = [
//   {
//     id: 'Available',
//     label: 'Available',
//     value: 75,
//     color: 'var(--mainColor1)',
//   },
//   {
//     id: 'Used',
//     label: 'Used',
//     value: 25,
//     color: 'var(--mainColorPie)',
//   },
// ];

const PieChartPage = ({ data }) => {
  return (
    <div className="h-[100px] sm:h-[200px] w-[100%]">
      <ResponsivePie
        data={data}
        padAngle={0.7}
        innerRadius={0}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={({ data }) => data.color}
        legends={[
          {
            anchor: 'bottom', // Position of the legend (e.g., 'top', 'bottom', 'left', 'right')
            direction: 'row', // Layout direction (e.g., 'row' or 'column')
            justify: false, // Whether to justify legend items
            translateX: 0, // Horizontal translation
            translateY: 56, // Vertical translation (adjust to avoid overlap)
            itemsSpacing: 10, // Spacing between legend items
            itemWidth: 100, // Width of each legend item
            itemHeight: 18, // Height of each legend item
            itemTextColor: '#555', // Text color for legend items
            itemDirection: 'left-to-right', // Direction of legend item icons and labels
            symbolSize: 18, // Size of the symbol in the legend
            symbolShape: 'circle', // Shape of the symbol ('circle', 'square', etc.)
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000', // Color change on hover
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default PieChartPage;

