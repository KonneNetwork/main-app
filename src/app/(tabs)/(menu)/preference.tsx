import Button from '@/components/Button'
import { ProgressBar } from '@/components/ProgressBar'
import AgeSelector from '@/components/Seletor'
import { Ionicons } from '@expo/vector-icons'
import classNames from 'classnames'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const etapas = [
  {
    id: "1",
    title: "Qual seu assunto preferido?",
    subtitle: "Escolha até 5 assuntos:",
    maxSelections: 5,
    options: [
      { id: 1, title: 'Networking' },
      { id: 2, title: 'Marketing' },
      { id: 3, title: 'TI' },
      { id: 4, title: 'Publicidade' },
      { id: 5, title: 'Cibersegurança' },
      { id: 6, title: 'Dança' },
      { id: 7, title: 'Musica' },
      { id: 8, title: 'Escrita' },
      { id: 9, title: 'Esporte' },
      { id: 10, title: 'Design' }
    ]
  },
  {
    id: "2",
    title: "Quais seus objetivos?",
    subtitle: "Selecione seus objetivos por aqui:",
    maxSelections: 5,
    options: [
      { id: 1, title: "Networking" },
      { id: 2, title: "Contratar" },
      { id: 3, title: "Social" },
      { id: 4, title: "Educação" }
    ]
  },
  {
    id: "3",
    title: "Quero me Konnectar com:",
    subtitle: "Escolha até 5 áreas de interesse:",
    maxSelections: 5,
    options: [
      { id: 1, title: 'Design' },
      { id: 2, title: 'Arquitertura' },
      { id: 3, title: 'Negócios' },
      { id: 4, title: 'Devs' },
      { id: 5, title: 'Cibersegurança' },
      { id: 6, title: 'Dança' },
      { id: 7, title: 'Musica' },
      { id: 8, title: 'Escrita' },
      { id: 9, title: 'Esporte' },
    ]
  },
  {
    id: "4",
    title: "Como você se identifica?",
    maxSelections: 1,
    options: [
      { id: 1, title: 'Homem' },
      { id: 2, title: 'Mulher' },
      { id: 3, title: 'Não binário' },
      { id: 4, title: 'Prefiro não informar' },
    ]
  },

]
// {
//   id: "5",
//   title: "Qual a sua idade?",
//   slider: [18, 101]
// }

export default function Preference() {
  const statusBarInitialValue = 100 / etapas.length
  const [stage, setStage] = useState(0)
  const [statusBarProgress, setStatusBarProgress] = useState(statusBarInitialValue)
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string[] }>({})
  console.log("🚀 ~ Preference ~ selectedOptions:", selectedOptions)


  const handleSelectOption = (stageId: string, optionId: string) => {
    setSelectedOptions((prev) => {
      const selectedStageOptions = prev[stageId] || []
      const isSelected = selectedStageOptions.includes(optionId)

      const maxSelections = etapas.find(etapa => etapa.id === stageId)?.maxSelections || 1

      let updatedStageOptions
      if (isSelected) {
        updatedStageOptions = selectedStageOptions.filter(id => id !== optionId)
      } else {
        if (selectedStageOptions.length < maxSelections) {
          updatedStageOptions = [...selectedStageOptions, optionId]
        } else {
          updatedStageOptions = maxSelections === 1 ? [optionId] : selectedStageOptions
        }
      }

      return { ...prev, [stageId]: updatedStageOptions }
    })
  }



  // const handleSelectOption = (stageId: string, optionId: string) => {
  //   setSelectedOptions(prev => {
  //     const selectedStageOptions = prev[stageId] || []
  //     const isSelected = selectedStageOptions.includes(optionId)

  //     const updatedStageOptions = isSelected
  //       ? selectedStageOptions.filter(id => id !== optionId)
  //       : [...selectedStageOptions, optionId]

  //     return { ...prev, [stageId]: updatedStageOptions.slice(0, 5) }
  //   })
  // }

  function nextProgress() {
    if (stage === (etapas.length - 1)) {
      router.back()
    }
    if (stage < (etapas.length - 1)) {
      setStage(stage + 1)
      setStatusBarProgress(statusBarProgress + statusBarInitialValue)
    }
  }

  function backProgress() {
    if (stage > 0) {
      setStage(stage - 1)
      setStatusBarProgress(statusBarProgress - statusBarInitialValue)
    }
  }

  const currentStageOptions = selectedOptions[etapas[stage].id] || []

  return (
    <FlatList
      className='bg-white'
      data={etapas[stage].options}
      contentContainerStyle={{ padding: 30, flexGrow: 1, justifyContent: 'center', alignContent: 'center' }}
      renderItem={({ item }) => {
        const isSelected = currentStageOptions.includes(item.title)
        return (
          <TouchableOpacity
            className={
              classNames(' my-2 justify-center items-center p-6 rounded-xl ',
                {
                  "bg-surface-brand-main-selected border-2 border-surface-brand-main-selected": isSelected
                }, {
                'border-2 border-[#528A8C] bg-[#EEEEEE]': !isSelected
              })
            }
            onPress={() => handleSelectOption(etapas[stage].id, item.title)}
          >
            <Text className={classNames('color-[#528A8C] font-outfit-600 text-lg', {
              'color-white': isSelected
            }, {
              'color-[#528A8C]': !isSelected
            })}
            >{item.title}</Text>
          </TouchableOpacity>
        )
      }}
      ListHeaderComponentStyle={{ marginBottom: 30 }}
      ListHeaderComponent={
        <>
          <View className='flex-row items-center gap-6 s'>
            <Ionicons name="chevron-back-outline" size={25} color="black" onPress={() => router.back()} />
            <Text className='color-[#374151] font-inter-400 text-lg'>Preferências</Text>
          </View>
          <ProgressBar progress={statusBarProgress} />
          <Text className='text-4xl font-inter-500 color-[#528A8C]'>{etapas[stage].title}</Text>
          {etapas[stage]?.subtitle && <Text>{etapas[stage].subtitle}</Text>}
          {/* <AgeSelector /> */}
        </>
      }
      ListFooterComponentStyle={{ marginTop: 30, flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
      ListFooterComponent={
        <View className='flex-row'>
          {statusBarProgress > statusBarInitialValue &&
            // <Button mediumButton variant='inactive' title='voltar' onPress={backProgress} /> 
            <TouchableOpacity
              className='justify-center items-center p-6  rounded-3xl' style={{ width: '48%' }}
              onPress={backProgress} >
              <Text className='color-[#528A8C] font-inter-500 text-lg'>
                voltar
              </Text>
            </TouchableOpacity>
          }
          {/* <Button mediumButton variant='active' title={(etapas.length - 1) === stage ? "Concluir" : "Próximo"} onPress={nextProgress} disabled={currentStageOptions.length === 0} /> */}
          <TouchableOpacity
            className='justify-center items-center border-1 p-6 border-[#528A8C] rounded-3xl'
            style={{ backgroundColor: currentStageOptions.length === 0 ? '#708788' : '#528A8C', width: '48%' }}
            onPress={nextProgress} disabled={currentStageOptions.length === 0} >
            <Text className='color-[#FFFFFF] font-inter-500 text-lg'>
              {(etapas.length - 1) === stage ? "Concluir" : "Próximo"}
            </Text>
          </TouchableOpacity>
        </View>
      }
    />
  )
}
