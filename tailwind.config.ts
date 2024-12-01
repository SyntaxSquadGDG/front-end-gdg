import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue1: '#132863',
        blue2: '#021C63',
        blue3: '#3C57A4',
        textLight: '#FFFFFF',
        gold1: '#CDAD8F',
        gold2: '#FAE1CB',
        textGray: '#929292',
        cardColor: '#D4DDF7',
        storageContainer: '#F6F8FF',
        textGray2: '#848484',
        tableBorder: '#6E6E6E',
      },
      boxShadow: {
        activityLog: '0 0 4.4px rgba(19, 40, 99, 0.7)',
        tableShadow: '0 0 7.6px rgba(19, 40, 99, 0.8)',
      },
      borderRadius: {
        bigRounded: '40px',
      },

      spacing: {
        iconSpacing: '16px',
      },
    },
  },
  plugins: [],
} satisfies Config;

