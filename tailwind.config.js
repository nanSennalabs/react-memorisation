/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF004D",
          1: "#7E2553",
        },
        secondary: {
          DEFAULT: "#FAEF5D",
        },
        black: {
          DEFAULT: "#191919",
          1: "#1D2B53",
        },
        gray: {
          DEFAULT: "#3C444B",
          1: "#747B83",
          2: "#A5ACB2",
          3: "#CACFD5",
          4: "#E9EAEC",
          5: "#D6D6D6",
          6: "#A5ACB3",
        },
        white: {
          DEFAULT: "#FFFFFF",
        },
      },
      boxShadow: {
        drop1: "0px 0px 10px 0px rgba(116, 123, 131, 0.16);",
        drop2: "0px 0px 10px 0px rgba(116, 123, 131, 0.08);",
        drop3: "0px 0px 10px 0px rgba(116, 123, 131, 0.15);",
      },
    },
  },
  experimental: { optimizeUniversalDefaults: true },
  plugins: [],
};
