/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./docs/*.{html,js}"],
  theme: {
    extend: {
      borderRadius: {
        '45%': '45%',
      }
    },
  },
  plugins: [],
}

