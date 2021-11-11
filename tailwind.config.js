module.exports = {
  purge: {
    enabled: false,
    content: ['./dist/**/*.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primaryColor: {
          light: '#64C3BF',
          DEFAULT: '#00807E',
          dark: '#007572'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
