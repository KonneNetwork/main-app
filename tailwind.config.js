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
        background: '#1C2D4CE0',
        'surface-primary': '#FFFFFF',
        'surface-secundary': '#F5F5F5',
        'surface-tertiary': '#EEEEEE',
        'surface-disabled': '#CCCCCC',
        'surface-neutral-default': '#CCCCCC',
        'surface-neutral-houver': '#EEEEEE',
        'surface-neutral-selected': '#9E9E9E',
        'surface-brand-default': '#528A8C',
        'surface-brand-houver': '##33586C',
        'surface-brand-selected': '##1C2D4C',
        'surface-Subdued-default': '#199ED81A',
        'surface-Subdued-houver': '##1C2D4C',
        'surface-Subdued-selected': '##1C2D4C',


      }
    },
  },
  plugins: [],
}