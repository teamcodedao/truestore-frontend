import type {Config} from 'tailwindcss';
import {iconsPlugin, getIconCollections} from '@egoist/tailwindcss-icons';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1180px',
        xl: '1280x',
      },
    },
  },
  plugins: [
    require('tailwindcss-mixins'),
    require('tailwindcss-multi'),
    iconsPlugin({
      collections: getIconCollections(['radix-icons']),
    }),
  ],
};
export default config;
