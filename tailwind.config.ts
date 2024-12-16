import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
      },
    },
    extend: {
      screens: {
        xs: '400px', // Custom breakpoint for 400px
      },

      colors: {
        blue1: '#132863',
        blue2: '#021C63',
        blue3: '#3C57A4',
        gold1: '#CDAD8F',
        gold2: '#FAE1CB',
        textGray: '#929292',
        textGray2: '#848484',
        myColor: 'var(--myColor)',

        guestMainColor: 'var(--guestMainColor)',
        guestSecondary1: 'var(--guestSecondary1)',
        guestSecondary2: 'var(--guestSecondary2)',
        guestSecondary3: 'var(--guestSecondary3)',

        textLight: 'var(--textLight)',
        textDark: 'var(--textDark)',
        iconLight: 'var(--iconLight)',
        iconDark: 'var(--iconDark)',
        mainColor1: 'var(--mainColor1)',
        mainColor2: 'var(--mainColor2)',
        mainColor3: 'var(--mainColor3)',
        mainColor1Opacity: 'var(--mainColor1Opacity)',
        mainColor2Opacity: 'var(--mainColor2Opacity)',
        secondaryColor1: 'var(--secondaryColor1)',
        secondaryColor2: 'var(--secondaryColor2)',
        mainColorPie: 'var(--mainColorPie)',
        mainColorBar: 'var(--mainColorBar)',
        dangerColor: 'var(--dangerColor)',
        placeHolderColor: 'var(--placeHolderColor)',
        errorColor: 'var(--errorColor)',
        cardColor: 'var(--cardColor)',
        tableText: 'var(--tableText)',
        tableBorder: 'var(--tableBorder)',
        storageContainer: 'var(--storageContainer)',
        lowColor: 'var(--lowColor)',
        highColor: 'var(--highColor)',
      },
      height: {
        horizontalNavHeight: 'var(--horizontalNavHeight)',
        guestNavHeight: 'var(--guestNavHeight)',
        sectionHeight: 'calc(100vh - 100px)',
      },
      width: {
        verticalNavWidth: 'var(--verticalNavWidth)',
        verticalNavSmallWidth: 'var(--verticalNavSmallWidth)',
      },
      boxShadow: {
        activityLog: '0 0 4.4px rgba(19, 40, 99, 0.7)',
        tableShadow: '0 0 8px 0 rgba(19, 40, 99, 0.5)',
      },
      borderRadius: {
        bigRounded: '40px',
        navsRadius: 'var(--navsRadius)',
      },
      backgroundImage: {
        goldLinear:
          'linear-gradient(to right, var(--secondaryColor1), var(--secondaryColor1), var(--secondaryColor2))',
        goldText:
          'linear-gradient(to right, var(--guestSecondary1), var(--guestSecondary2), var(--guestSecondary3))',
        'custom-linear': 'linear-gradient(to right, #132863, #021C63)',
        horizontalNavLinear:
          'linear-gradient(to right, var(--mainColor1), var(--mainColor2))',
        horizontalNavLinearRTL:
          'linear-gradient(to left, var(--mainColor1), var(--mainColor2))',
        mainDashboardLinear:
          'linear-gradient(to bottom, var(--mainColor1Opacity), var(--mainColor2Opacity))',
        buttonLinear:
          'linear-gradient(to right, var(--mainColor1), var(--mainColor2))',
        guestLinear: 'linear-gradient(to top, transparent, #FFFFFF55)',
      },
      spacing: {
        iconSpacing: '16px',
        navsBodySpacing: 'var(--navsBodySpacing)',
        searchBarTop: 'var(--searchBarTop)',
        activitySpace: 'var(--activitySpace)',
        guestNavSpacing: 'var(--guestNavHeight)',
        sectionPadding: 'var(--sectionPadding)',
        sectionGap: 'var(--sectionGap)',
      },
    },
  },
  plugins: [],
} satisfies Config;

