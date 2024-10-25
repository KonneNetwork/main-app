import Button from '@/components/Button'
import ButtonTeste from '@/components/ButtonTest'
import { ProgressBar } from '@/components/ProgressBar'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'

export default function preference() {

  const [statusProgress, setStatusProgress] = useState(0)
  const [favoriteTheme, setFavoriteTheme] = useState<string[]>([])
  // const [select, setSelect] = useState(false)


  function nextProgress() {
    if (favoriteTheme.length === 5) {
      setStatusProgress(statusProgress + 25)
    } else {
      Alert.alert(favoriteTheme.length > 5 ? "Você selecinou mais de cinco" : "Você selecionou menos que cinco")
    }
  }

  function backProgress() {
    setStatusProgress(statusProgress - 25)
  }

  function selectTheme(theme: string, setValue: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) {
    if (value) {
      const select = favoriteTheme.findIndex(item => item === theme);
      favoriteTheme.splice(select, 1)

      setValue(!value)
    } else {
      setFavoriteTheme((prevValue) => [...prevValue, theme])
      console.log('selecionado', favoriteTheme)
      setValue(!value)
    }

  }
  const options = [
    {
      id: 1,
      title: 'Networking'
    },
    {
      id: 2,
      title: 'Marketing'
    },
    {
      id: 3,
      title: 'TI'
    },
    {
      id: 4,
      title: 'Publicidade'
    },
    {
      id: 5,
      title: 'Cibersegurança'
    },
    {
      id: 6,
      title: 'Dança'
    },
    {
      id: 7,
      title: 'Musica'
    },
    {
      id: 8,
      title: 'Escrita'
    },
    {
      id: 9,
      title: 'Esporte'
    },
    {
      id: 10,
      title: 'Design'
    }
  ]
  // const questions = [
  //   {
  //     title: "Qual o negócio",
  //     subtitle: "Diga qual é o negócio",
  //     options,
  //     slider: [18, 101], //null
  //     numberOfOptions: [1, 5], //[1, 1]
  //   }
  // ]
  // const slider = questions[0].slider;
  // console.log(Array.from(Array(slider[1]).keys()).slice(slider[0]))




  return (
    <ScrollView>
      <View className='bg-white flex-1 p-8'>
        <View className='flex-row items-center gap-6'>
          <Ionicons name="chevron-back-outline" size={25} color="black" onPress={() => router.back()} />
          <Text className='color-[#374151] font-inter-400 text-lg'>Preferências</Text>
        </View>


        <ProgressBar progress={statusProgress} />

        <Text className='text-4xl font-inter-500 color-[#528A8C]'>Qual seu assunto preferido?</Text>
        <Text>
          Escolha até 5 assuntos:
        </Text>


        {options.map(({ id, title }) => {
          return (
            <ButtonTeste key={id} selectTheme={selectTheme} id={id} title={title} />
          )
        })}

        <View className='flex-row'>
          {statusProgress > 0 && <Button mediumButton variant='inactive' title='voltar' onPress={backProgress} />}

          <Button mediumButton variant='active' title='proximo' onPress={nextProgress} />
        </View>

      </View >
    </ScrollView>
  )
}
