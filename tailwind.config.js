/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        primary: 'rgb(17, 20, 25)',
        secondary: 'rgb(3 7 18)',
        complementary: 'rgb(75 85 99)',
        // equivalent to Tailwind's gray-800
        // Or use hex: '#1f2937'
      },
    },
  },
  plugins: [],
};
