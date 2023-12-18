/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        'transparent-silver': 'rgba(200,200,200,0.5)',
      },
    },
    plugins: [],
  },
}
