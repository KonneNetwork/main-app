import { Inter_100Thin, Inter_200ExtraLight, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import '../../global.css'
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { Image, SafeAreaView } from "react-native";
import { Slot } from 'expo-router';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return <Image source={require('../../assets/images/splash.png')} resizeMode="cover" className="flex-1 w-full" />

  }
  return (
    <>
      <SafeAreaView className="flex-1">
        <Slot />
      </SafeAreaView>
    </>
  );
}
