import { Stack } from 'expo-router/stack';

export default function MenuLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,

    }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='preference' />
    </Stack>
  )
}