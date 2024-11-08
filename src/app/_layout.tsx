import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Outfit_600SemiBold, Outfit_700Bold } from '@expo-google-fonts/outfit'
import '../../global.css';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { Image } from "react-native";
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Outfit_600SemiBold,
    Outfit_700Bold
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
      <GestureHandlerRootView className='flex-1'>
        {/* <SafeAreaView style={{ flex: 1 }} > */}
        <StatusBar style="light" />
        <Slot />
        {/* </SafeAreaView> */}
      </GestureHandlerRootView>
    </>
  );
}
