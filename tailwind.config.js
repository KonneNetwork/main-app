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

        background: '#1C2D4C',
        "surface-primary": "#FFFFFF",
        "surface-secondary": "#F5F5F5",
        "surface-tertiary": "#EEEEEE",
        "surface-disabled": "#CCCCCC",
        "surface-neutral-default": "#CCCCCC",
        "surface-neutral-hover": "#EEEEEE",
        "surface-neutral-selected": "#9E9E9E",
        "surface-brand-main-default": "#528A8C",
        "surface-brand-main-hover": "#33586C",
        "surface-brand-main-selected": "#1C2D4C",
        "surface-brand-subdued-default": "#199ED8",
        "surface-brand-subdued-hover": "#007EAF",
        "surface-brand-subdued-selected": "#003F58",
        "surface-action-main-default": "#05020D",
        "surface-action-main-hover": "#424242",
        "surface-action-main-selected": "#262626",
        "surface-action-subdued-default": "#FFFFFF",
        "surface-action-subdued-hover": "#007EAF",
        "surface-action-subdued-selected": "#262626",
        "surface-inverse-main-default": "#FFFFFF",
        "surface-inverse-main-hover": "#F5F5F5",
        "surface-inverse-main-selected": "#EEEEEE",
        "surface-inverse-subdued-default": "#FFFFFF",
        "surface-inverse-subdued-hover": "#F5F5F5",
        "surface-inverse-subdued-selected": "#EEEEEE",
        "surface-success-default": "#06AA48",
        "surface-success-hover": "#05883A",
        "surface-success-selected": "#EEEEEE",
        "surface-warning-default": "#F09000",
        "surface-warning-hover": "#C07300",
        "surface-warning-selected": "#603A00",
        "surface-error-default": "#CA2E24",
        "surface-error-hover": "#9D120A",
        "surface-error-selected": "#4E0905",
        "surface-inverse-subdued-default": "#FFFFFF",
        "surface-inverse-subdued-hover": "#9D120A",
        "surface-inverse-subdued-selected": "#4E0905",
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
        'outfit-600': 'Outfit_600SemiBold',
        'outfit-700': 'Outfit_700Bold'
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