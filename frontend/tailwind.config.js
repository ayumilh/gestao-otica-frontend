/** @type {import('tailwindcss').Config} */
const plugin = require('tailwind-scrollbar');
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#F6F6FB',
        primaria: {
          900: '#23262F',
          800: '#393C45',
        },
        segundaria: {
          900: '#E0822D',
          800: '#FA8C05',
          700: '#F6F6FB',
        },
        dark: {
          bg: '23262F',
          primaria: {
            900: "#393C45",
            800: "#23262F",
          },
          segundaria: {
            900: "#E0822D",
            800: "#FA8C05",
            700: '#F6F6FB',
          },
        },
      },
      boxShadow: {
        primaria: '0px 5px 24px rgba(168, 82, 5, 0.2)',
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-out forwards',
      },
    },
  },
  plugins: [
    plugin,
  ],
};
