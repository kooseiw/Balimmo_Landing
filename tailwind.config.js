/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Balimmo brand tokens (from the original landing page)
        primary: {
          DEFAULT: '#003538', // dark teal used for headings
          dark: '#063436',
          deep: '#0c3b35',
          muted: '#4b645f',
        },
        accent: {
          DEFAULT: '#eba859', // gold used for prices / highlights
          alt: '#FFA00A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Nunito', 'Inter', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}
