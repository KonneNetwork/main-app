import { Tabs } from "expo-router";
import { Icons } from "@/components/Icons";
import TabBarIcon from "@/components/TabBarIcon";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";


export default function TabLayout() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style='dark' />
        <Tabs screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarStyle: { height: 56 },
          tabBarActiveTintColor: "#1C2D4C",
          tabBarIconStyle: {
            marginBottom: -8,
          },
          tabBarLabelStyle: {
            fontFamily: 'Inter_400Regular',
            fontSize: 12,
            lineHeight: 16
          }
        }}>
          <Tabs.Screen name="buscar" options={{
            headerShown: false, title: 'Buscar', tabBarIcon: ({ color, focused }) => (
              <TabBarIcon color={color} focused={focused} >
                <Icons.map color={color} width={24} height={24} />
              </TabBarIcon>
            )
          }} />
          <Tabs.Screen name="index" options={{
            headerShown: false, title: 'Konnexões', tabBarIcon: ({ color, focused }) => (
              <TabBarIcon color={color} focused={focused} >
                <Icons.heart color={color} width={24} height={24} />
              </TabBarIcon>
            )
          }} />
          < Tabs.Screen name="(perfil)" options={{
            headerShown: false, title: 'Perfil', tabBarIcon: ({ color, focused }) => (
              <TabBarIcon color={color} focused={focused} >
                <Icons.perfil color={color} width={24} height={24} />
              </TabBarIcon>
            )
          }} />
          < Tabs.Screen name="menu" options={{
            headerShown: false, title: 'Menu', tabBarIcon: ({ color, focused }) => (
              <TabBarIcon color={color} focused={focused} >
                <Icons.menu color={color} width={24} height={24} />
              </TabBarIcon>
            )
          }} />

        </Tabs >
      </SafeAreaView>
    </>
  )

}