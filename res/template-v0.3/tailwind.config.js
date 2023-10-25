/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          "100": "#fcfcfc",
          "200": "rgba(255, 255, 255, 0.74)",
          "300": "rgba(0, 0, 0, 0.5)",
          "400": "rgba(4, 9, 14, 0.8)",
          "500": "rgba(4, 9, 14, 0.7)",
        },
        black: "#000",
        white: "#fff",
        yellowgreen: "#81b826",
        gainsboro: "#d9d9d9",
      },
      spacing: {},
      fontFamily: {
        "running-text": "Poppins",
      },
      borderRadius: {
        xl: "20px",
        "6xl": "25px",
        "31xl": "50px",
      },
    },
    fontSize: {
      "21xl": "40px",
      xl: "20px",
      base: "16px",
      "5xl": "24px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
