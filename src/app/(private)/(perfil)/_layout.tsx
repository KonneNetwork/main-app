import { Stack } from 'expo-router/stack';
import { SafeAreaView } from "react-native-safe-area-context";

export default function PerfilLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: { flex: 1 }
      }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='edit-perfil' />
        <Stack.Screen name='add-link' />
        <Stack.Screen name='edit-link' />
      </Stack>
    </SafeAreaView>
  )
}