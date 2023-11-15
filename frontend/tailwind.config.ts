import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        assistant: ['var(--font-assistant)', 'sans-serif'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

const EXTEND_THEM_COLORS = ['primary', 'secondary', 'error', 'warning', 'success'];

function addDynamicColors(config: Config): Config {
  if (config.theme?.extend) {
    // colors
    const colors = config.theme.extend.colors ? config.theme.extend.colors : {};
    const extendThemeColors = Object.fromEntries(
      EXTEND_THEM_COLORS.map((colorName) => [
        colorName,
        {
          DEFAULT: `var(--color-${colorName})`,
          light: `var(--color-${colorName}-light)`,
          foreground: `var(--color-${colorName}-foreground)`,
        },
      ])
    );

    // backgroundColor
    const backgroundColor = config.theme.extend.backgroundColor ? config.theme.extend.backgroundColor : {};

    const extraBackgroundColors = Object.fromEntries(
      Object.entries(extendThemeColors).map(([colorName, value]) => [colorName, value.DEFAULT])
    );
    const extraBackgroundLightColors = Object.fromEntries(
      Object.entries(extendThemeColors).map(([colorName, value]) => [colorName + '-light', value.light])
    );

    // textColor
    const textColor = config.theme.extend.textColor ? config.theme.extend.textColor : {};

    const extraTextColor = Object.fromEntries(Object.entries(extendThemeColors).map(([colorName, value]) => [colorName, value.foreground]));

    // add the new fields
    config.theme.extend.colors = {
      ...extendThemeColors,
      ...colors,
    };

    config.theme.extend.backgroundColor = {
      ...extraBackgroundColors,
      ...extraBackgroundLightColors,
      ...backgroundColor,
    };

    config.theme.extend.textColor = {
      ...extraTextColor,
      ...textColor,
    };
  }

  return config;
}

export default addDynamicColors(config);
