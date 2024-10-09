import { Tabs } from "expo-router";
import { Icons } from "@/components/Icons";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "#1C2D4C",
      headerPressColor: '#1C2D4C'
    }}>
      <Tabs.Screen name="buscar" options={{
        headerShown: false, title: 'Buscar', tabBarIcon: ({ color }) => (
          <Icons.map color={color} width={24} height={24} />)
      }} />
      <Tabs.Screen name="index" options={{
        headerShown: false, title: 'Konnexões', tabBarIcon: ({ color }) => (
          <Icons.heart color={color} width={24} height={24} />
        )
      }} />
      <Tabs.Screen name="perfil" options={{
        headerShown: false, title: 'Perfil', tabBarIcon: ({ color }) => (
          <Icons.perfil color={color} width={24} height={24} />)
      }} />
      <Tabs.Screen name="menu" options={{
        headerShown: false, title: 'Menu', tabBarIcon: ({ color }) => (
          <Icons.menu color={color} width={24} height={24} />)
      }} />

    </Tabs >
  )

}