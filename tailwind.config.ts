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
      yellow: '#ffc107',
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
      collections: {
        ...getIconCollections(['carbon', 'radix-icons']),
        custom: {
          icons: {
            discount: {
              body: `<path fill="currentColor" d="M12.79 21L3 11.21v2.83l9.79 9.79l9.04-9.04l-1.42-1.41z"/><path fill="currentColor" d="m3 9.04l9.79 9.79l9.04-9.04L12.04 0H3zM7.25 3a1.25 1.25 0 1 1 0 2.5a1.25 1.25 0 0 1 0-2.5"/>`,
              width: 24,
              height: 24,
            },
          },
        },
      },
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
