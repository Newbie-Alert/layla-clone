import type { ConfigContext, ExpoConfig } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "clone",
  slug: "clone",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "clone",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,

  ios: {
    "supportsTablet": true
  },

  android: {
      adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png"
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    permissions: [
      "android.permission.ACCESS_COARSE_LOCATION",
      "android.permission.ACCESS_FINE_LOCATION",
    ],
    config: {
      googleMaps: {
        apiKey:process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY
      }
    },
    package:'com.tony.bokduckclone'
  },

  web: {
    output: "static",
    favicon: "./assets/images/favicon.png"
  },

  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000"
        }
      }
    ]
  ],

  experiments: {
    typedRoutes: true,
    reactCompiler: true
  },

  extra: {
    eas: {
      projectId: "6141d6db-d4e2-4d8b-aff4-e9759348f0b2"
    }
  }
})
