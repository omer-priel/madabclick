import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        whitesmoke: 'rgba(241, 241, 241, 0.95)',
        black: '#000',
        gainsboro: '#d9d9d9',
        white: '#fff',
        gray: {
          '100': '#1a1b36',
          '200': 'rgba(255, 255, 255, 0.74)',
          '300': 'rgba(0, 0, 0, 0.5)',
        },
        yellowgreen: {
          '100': '#98df25',
          '200': '#81b826',
        },
      },
      spacing: {},
      fontFamily: {
        'running-text-light': 'Poppins',
        rubik: 'Rubik',
      },
    },
    fontSize: {
      base: '16px',
      xl: '20px',
      '77xl': '96px',
      inherit: 'inherit',
    },
    fontFamily: {
      ...defaultTheme.fontFamily,
      poppins: ['Poppins'],
    },
  },
  plugins: [],
};

export default config;
