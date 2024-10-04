/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './**/*.tsx',
    './src/**/*.tsx',
    './src/**/**/*.tsx',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#1C2D4CE0'
      }
    },
  },
  plugins: [],
}