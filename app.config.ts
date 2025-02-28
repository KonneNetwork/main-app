import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "konne",
  slug: "konne-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/logoKonneSquare.png",
  scheme: "myapp",
  platforms: ['android', 'ios'],
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "cover",
    backgroundColor: "#ffffff"
  },
  ios: {
    usesAppleSignIn: true,
    infoPlist: {
      UIViewControllerBasedStatusBarAppearance: "NO",
      NSLocationWhenInUseUsageDescription: "O aplicativo precisa de acesso à sua localização enquanto está em uso para fornecer a funcionalidade de mapas.",
      NSLocationAlwaysUsageDescription: "O aplicativo precisa de acesso à sua localização em segundo plano para fornecer atualizações contínuas."
    },
    config: {
      googleMapsApiKey: process.env.GOOGLE_API_KEY,
    },
    bundleIdentifier: "com.egestao.konneapp",
    buildNumber: '9'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/logoKonneSquare.png",
      backgroundColor: "#ffffff"
    },
    permissions: [
      "android.permission.ACCESS_FINE_LOCATION",
      "android.permission.ACCESS_COARSE_LOCATION",
      "android.permission.ACCESS_BACKGROUND_LOCATION",
      "android.permission.RECORD_AUDIO"
    ],
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_API_KEY,
      }
    },
    package: "com.egestao.konneapp",
    versionCode: 9
  },
  web: {
    bundler: "metro",
    output: "static",
  },
  plugins: [
    "expo-router",
    "expo-font",
    "expo-localization",
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission: "Allow $(PRODUCT_NAME) to use your location."
      }
    ],
    [
      "expo-image-picker",
      {
        photosPermission: "The app accesses your photos to let you share them with your friends."
      }
    ],
    [
      "expo-dev-launcher",
      {
        launchMode: "most-recent"
      }
    ],
    [
      "expo-camera",
      {
        "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
        "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone",
        "recordAudioAndroid": true
      }
    ],
    [
      "expo-media-library",
      {
        "photosPermission": "Allow $(PRODUCT_NAME) to access your photos.",
        "savePhotosPermission": "Allow $(PRODUCT_NAME) to save photos.",
        "isAccessMediaLocationEnabled": true
      }
    ],
    ["expo-apple-authentication"]
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    router: {
      origin: false
    },
    eas: {
      projectId: "cd1cdce2-cdb2-4550-b218-201e2b588f05"
    }
  },
  owner: "egestao"
})