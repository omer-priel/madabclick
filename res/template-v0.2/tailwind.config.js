/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          "100": "#fcfcfc",
          "200": "#04090e",
          "300": "rgba(255, 255, 255, 0.74)",
          "400": "rgba(0, 0, 0, 0.5)",
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
        "31xl": "50px",
      },
    },
    fontSize: {
      base: "16px",
      xl: "20px",
      "5xl": "24px",
      "21xl": "40px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
