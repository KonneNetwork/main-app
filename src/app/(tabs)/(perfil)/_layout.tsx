import { Stack } from 'expo-router/stack';

export default function PerfilLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='edit-perfil' />
      <Stack.Screen name='add-link' />
      <Stack.Screen name='edit-link' />
    </Stack>
  )
}