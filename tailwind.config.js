/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: (theme) => ({
        ...theme("colors"),
        grey: "#111111",
        "warm-grey": "#AEA79F",
        "cool-grey": "#333333",
        orange: "#E95420",
        "lite-abrgn": "#77216F",
        "med-abrgn": "#5E2750",
        "drk-abrgn": "#2C001E",
        "window-title": "#201f1f",
        "gedit-dark": "#021B33",
        "gedit-light": "#003B70",
        "gedit-darker": "#010D1A",
      }),
      textColor: (theme) => ({
        ...theme("colors"),
        "t-grey": "#F6F6F5",
        "t-warm-grey": "#AEA79F",
        "t-cool-grey": "#333333",
        "t-blue": "#3465A4",
        "t-green": "#4E9A06",
        "t-gedit-orange": "#F39A21",
        "t-gedit-blue": "#50B6C6",
        "t-gedit-dark": "#003B70",
      }),
      borderColor: (theme) => ({
        ...theme("colors"),
        DEFAULT: theme("colors.gray.300", "currentColor"),
        orange: "#E95420",
      }),
    },
  },
  plugins: [],
};
