/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    colors: {
      'pikachu_yellow': "#FFCB05",
      'blue': '#007BC1',
      'red': '#E63E57',
      'green': '#6DB33F',
      'white': '#fff'
    },
    
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {},
  },

  plugins: [],
}

