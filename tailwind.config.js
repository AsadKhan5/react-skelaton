/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1b5277",
          secondary: "#7b92b2",
          accent: "#70acc7",
          neutral: "#7b92b2",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
