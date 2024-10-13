/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        subMain: "#14759f",
        oldMain:"#f20000",
        text: "#C0C0C0",
        main: "#080A1A",
        dryGray: "rgb(224 213 213)",
        border: "#4b5563",
        star: "rgb(255 176 0)",
      },
    },
  },
  plugins: [],
};
