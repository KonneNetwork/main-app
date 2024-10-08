import { Tabs } from "expo-router";
import { Icons } from "@/components/Icons";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "#0000ff",

    }}>
      <Tabs.Screen name="buscar" options={{
        headerShown: false, title: 'Buscar', tabBarIcon: ({ color }) => (
          <Icons.map color={color} width={28} height={28} />)
      }} />
      <Tabs.Screen name="index" options={{
        headerShown: false, title: 'Konnexões', tabBarIcon: ({ color }) => (
          <Icons.heart color={color} width={28} height={28} />)
      }} />
      <Tabs.Screen name="perfil" options={{
        headerShown: false, title: 'Perfil', tabBarIcon: ({ color }) => (
          <Icons.perfil color={color} width={28} height={28} />)
      }} />
      {/* <Tabs.Screen name="menu" options={{
        headerShown: false, title: 'Menu', tabBarIcon: ({ color }) => (
          <Icons.menu color='#00f0ff' width={28} height={28} />)
      }} /> */}
      <Tabs.Screen name="menu" options={{
        headerShown: false, title: 'Menu', tabBarIcon: ({ color }) => (
          <AntDesign name="upcircle" size={24} color={color} />)
      }} />

    </Tabs >
  )

}