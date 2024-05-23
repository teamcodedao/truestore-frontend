import type {Config} from 'tailwindcss';

import {getIconCollections, iconsPlugin} from '@egoist/tailwindcss-icons';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'overlay-in': 'overlay 300ms',
        'overlay-out': 'overlay 300ms reverse ease-in',
        'slide-left-in': 'slide-left 300ms',
        'slide-left-out': 'slide-left 300ms reverse ease-in',
        'slide-right-in': 'slide-right 300ms',
        'slide-right-out': 'slide-right 300ms reverse ease-in',
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
      },
    },
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1180px',
        xl: '1280x',
      },
      padding: {
        DEFAULT: '1rem',
        sm: '0',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-mixins'),
    require('tailwindcss-multi'),
    iconsPlugin({
      collections: getIconCollections(['carbon', 'radix-icons']),
    }),
  ],
};
export default config;
