import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        statusBarColor: '#1C2D4CE0',
        statusBarStyle: 'light',
        navigationBarColor: '#fff',
        headerShown: false
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
