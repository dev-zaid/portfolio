/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        phone: "300px",
        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        // => @media (min-width: 1024px) { ... }

        desktop: "1350px",
        // => @media (min-width: 1280px) { ... }
      },
      scale: {
        125: "1.25",
        175: "1.75",
        200: "2",
      },
      colors: {
        "dark-background": "#0A0A0B",
        "black-elevated": "#0A0A0B",
        elevated: "#252939",
        "elevated-hover": "#212129",
        primary: "#F9A828",
        "primary-blue": "#1E2734",
        "blue-elevated": "#232B38",
        "blue-active": "#29323E",
      },
    },
  },
  plugins: [],
};
