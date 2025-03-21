import Button from "@/components/Button";
import i18n, { languageResources } from "@/services/i18n";
import { Ionicons } from "@expo/vector-icons";
import classNames from "classnames";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";

export default function Laguanges() {
  // const laguangesSupport = [{ label: "Inglês", value: "en" }, { label: "Português", value: "pt" }]
  const laguangesSupport = [{ label: "Português", value: "pt" }]
  const [select, setSelect] = useState(false)
  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value).then(() => console.log("linguagem Alterada")).catch((err) => console.log(err))
  }

  useEffect(() => {
    console.log(select)
  }, [select])
  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      <View className='flex-1 bg-white pt-16 p-8 '>


        <View className='flex-row items-center gap-6 s'>
          <Ionicons name="chevron-back-outline" size={32} color="black" onPress={() => router.back()} />
          <Text className='color-[#374151] font-inter-400 text-lg'>Idiomas</Text>
        </View>

        <Text className={classNames('text-4xl font-inter-500 color-[#528A8C] mt-8')} >
          Escolha o idioma que prefere?
        </Text>
        {laguangesSupport.map(((item, index) => {
          return (<Button key={index} title={item.label} variant={select ? 'active' : 'inactive'} onPress={() => { changeLanguage(item.value); setSelect(!select) }} />
          )
        }))}

      </View>

    </ScrollView>
  )
}