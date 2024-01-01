module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        rhr: ['"Roboto-Thin"'],
        'rhr-ns': ['"Roboto-Thin"'],
      },
      colors: {
        red: { rhr: '#000000' },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
