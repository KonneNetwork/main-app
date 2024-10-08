import { Stack } from "expo-router";
import '../../global.css'

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: true,
        statusBarStyle: 'light'
      }} >
      <Stack.Screen name="index" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
