/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "inbackground": "#2D3034",
        "inblue": "#45cbf7",
        "ininvertedblue": "#BA3408",
        "inheaderbg": "#222"
      }
    },

  },
  plugins: [],
}

