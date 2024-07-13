import type {Config} from 'tailwindcss';
import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';
import createTheme from 'tailwindcss-themer';

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
        'slide-bottom-in': 'slide-bottom 300ms',
        'slide-bottom-out': 'slide-bottom 300ms reverse ease-in',
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      slate: colors.slate,
      red: colors.red,
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
    require('@tailwindcss/forms'),
    require('tailwindcss-mixins'),
    require('tailwindcss-multi'),
    require('tailwind-scrollbar-hide'),
    iconsPlugin({
      collections: getIconCollections(['carbon', 'radix-icons']),
    }),
    plugin(({addVariant}) => {
      addVariant('ios', '@supports(-webkit-touch-callout:none)');
    }),
    createTheme({
      defaultTheme: {
        extend: {
          colors: {
            primary: colors.orange,
          },
        },
      },
      themes: [
        {
          name: 'forest',
          extend: {
            colors: {
              primary: colors.red,
            },
          },
        },
      ],
    }),
  ],
};
export default config;
