import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "konne",
  slug: "konne-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/logoKonneSquare.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "cover",
    backgroundColor: "#ffffff"
  },
  ios: {
    infoPlist: {
      UIViewControllerBasedStatusBarAppearance: "NO",
      NSLocationWhenInUseUsageDescription: "O aplicativo precisa de acesso à sua localização enquanto está em uso para fornecer a funcionalidade de mapas.",
      NSLocationAlwaysUsageDescription: "O aplicativo precisa de acesso à sua localização em segundo plano para fornecer atualizações contínuas."
    },
    config: {
      googleMapsApiKey: process.env.GOOGLE_API_KEY,
    },
    bundleIdentifier: "com.egestao.konneapp",
    buildNumber: '4'
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
    versionCode: 4
  },
  web: {
    bundler: "metro",
    output: "static",
  },
  plugins: [
    "expo-router",
    "expo-font",
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
    ]
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