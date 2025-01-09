import Button from "@/components/Button";
import { languageResources } from "@/services/i18n";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text } from "react-native";

export default function Laguanges() {
  const laguangesSupport = ["Inglês", "Português"]
  return (
    <View className="flex-1 w-full">
      <View className='flex-row items-center gap-6 s'>
        <Ionicons name="chevron-back-outline" size={25} color="black" onPress={() => router.back()} />
        <Text className='color-[#374151] font-inter-400 text-lg'>Preferências</Text>
      </View>
      {laguangesSupport.map((item => <Button title={item} variant='active' />))}

    </View>
  )
}