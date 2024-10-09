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
        'inter-thin100': 'Inter_100Thin',
        'inter-extraLight200': 'Inter_200ExtraLight',
        'inter-light300': 'Inter_300Light',
        'inter-regular400': 'Inter_400Regular',
        'inter-medium500': ' Inter_500Medium',
        'inter-semibold600': 'Inter_600SemiBold',
        'inter-bold700': 'Inter_700Bold',
        'inter-extrabold800': '  Inter_800ExtraBold',
        'inter-black900': 'Inter_900Black',
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