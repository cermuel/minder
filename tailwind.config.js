/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        quote: ["Catamaran", "sans-serif"],
      },
      colors: {
        pry: "#737cde",
      },
      keyframes: {
        rotate: {
          to: {
            transform: "rotate(360deg)",
          },
        },
        appear: {
          from: {
            width: "0%",
          },
          to: {
            width: "100%",
          },
        },
      },
      animation: {
        myspin: "rotate 5s linear infinite",
      },
    },
  },
  plugins: [],
};
