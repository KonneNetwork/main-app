import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
export default function KonnexoesLayout() {
  const insets = useSafeAreaInsets();
  return (

    <Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='chat/[id]' />
    </Stack>

  )
}