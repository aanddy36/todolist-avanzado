/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-light': '#f3f4f6', 
        'background-white': '#ffffff', 
        'border': '#d1d5db', 
        'text-dark': '#374151', 
        'primary': '#4f46e5', 
        'primary-light': '#6366f1',
        'focus-ring': '#4f46e5',
        'text-light': '#ffffff', 
      },
    },
  },
  plugins: [],
}

