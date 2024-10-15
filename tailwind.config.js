/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './**/*.tsx',
    './src/**/*.tsx',
    './src/**/**/*.tsx',
    './src/**/*.{js,jsx,ts,tsx}',
    "./app/**/*.{js,jsx,ts,tsx}", // Para expo-router
    "./node_modules/nativewind/**/*.js", // Para o NativeWind
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
      },
      fontFamily: {
        'inter-100': 'Inter_100Thin',
        'inter-200': 'Inter_200ExtraLight',
        'inter-300': 'Inter_300Light',
        'inter-400': 'Inter_400Regular',
        'inter-500': ' Inter_500Medium',
        'inter-600': 'Inter_600SemiBold',
        'inter-700': 'Inter_700Bold',
        'inter-800': 'Inter_800ExtraBold',
        'inter-900': 'Inter_900Black',
        'roboto-400': 'Roboto_400Regular',
        'roboto-500': 'Roboto_500Medium',
        'roboto-700': 'Roboto_700Bold',
      },

      borderWidth: {
        "1": '1px',
      },
      height: {
        "1": '1px'
      },
    },
  },
  plugins: [],
}