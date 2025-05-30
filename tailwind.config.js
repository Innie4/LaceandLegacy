const colors = require('./src/design-system/colors').colors;
const typography = require('./src/design-system/typography');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: colors,
      backgroundColor: ({ theme }) => theme('colors'),
      textColor: ({ theme }) => theme('colors'),
      borderColor: ({ theme }) => theme('colors'),
      fontFamily: typography.fontFamilies,
      fontSize: typography.fontSizes,
      fontWeight: typography.fontWeights,
      lineHeight: typography.lineHeights,
      letterSpacing: typography.letterSpacing,
    },
  },
  plugins: [],
}