module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        rhr: ['"SF Sports Night"'],
        'rhr-ns': ['"SF Sports Night NS"'],
      },
      colors: {
        bac: { rhr: '#212121' },
        red: { rhr: '#000000' },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
