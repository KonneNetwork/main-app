import { Stack } from 'expo-router/stack';
import { SafeAreaView } from "react-native-safe-area-context";
export default function MenuLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='preference' />
      </Stack>
    </SafeAreaView>
  )
}