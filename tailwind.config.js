/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        'transparent-black': 'rgba(15, 15, 15, 0.9)',
      },
    },
  },
  plugins: [],
}