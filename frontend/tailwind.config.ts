import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        black: '#000',
        white: '#fff',
      },
      spacing: {},
      fontFamily: {
        'running-text-light': 'Poppins',
      },
    },
    fontSize: {
      base: '16px',
      xl: '20px',
      '77xl': '96px',
      inherit: 'inherit',
    },
    fontFamily: {
      poppins: ['Poppins'],
    },
  },
  plugins: [],
};

export default config;
