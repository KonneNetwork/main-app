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
import { UserProvider } from '@/store/userStore';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from '@/services/query';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/services/ToastConfig';
// import '@/services/i18next';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/services/i18n';

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
  }, [loaded, error,]);

  if (!loaded && !error) {
    return <Image source={require('../../assets/images/splash.png')} resizeMode="cover" className="flex-1 w-full" />

  }
  return (
    <>
      <GestureHandlerRootView className='flex-1'>
        <QueryClientProvider client={queryClient} >
          <I18nextProvider i18n={i18n} defaultNS={"translation"}>
            <UserProvider>
              <StatusBar style="light" />
              <Slot />
              <Toast config={toastConfig} />
            </UserProvider>
          </I18nextProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </>
  );
}
