import Button from '@/components/Button'
import { ProgressBar } from '@/components/ProgressBar'
import AgeSelector from '@/components/Seletor'
import { Ionicons } from '@expo/vector-icons'
import classNames from 'classnames'
import { router, usePathname, useSegments } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native'
import Slider from '@react-native-community/slider';
import useGetTags from '@/queries/tags/getTags'

const etapas = [
  {
    id: "1",
    title: "Qual a sua área de atuação?",
    subtitle: "Escolha até 5 assuntos:",
    maxSelections: 5,
    tipo_tag: "Interesses",
  },
  {
    id: "2",
    title: "Quais são seus objetivos na Konne?",
    subtitle: "Selecione até 2:",
    maxSelections: 2,
    tipo_tag: "Objetivos",
  },
  {
    id: "3",
    title: "Quero me Konnectar com pessoas das seguintes áreas:",
    subtitle: "Escolha até 5:",
    maxSelections: 5,
    tipo_tag: "Interesses",
  },
  {
    id: "4",
    title: "Como você se identifica?",
    maxSelections: 1,
    tipo_tag: "Gênero",
  },
  {
    id: "5",
    title: "Qual a sua idade?",
    slider: [18, 101],
  },
];


export default function Preference() {
  const statusBarInitialValue = 100 / etapas.length
  const [stage, setStage] = useState(0)
  const [statusBarProgress, setStatusBarProgress] = useState(statusBarInitialValue)
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string[] }>({})
  const [age, setAge] = useState<number>(18)
  const lastQuestion = etapas.length - 1;
  const { data } = useGetTags()
  const pathname = usePathname()


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

  const optionsByStage = etapas.map(etapa => {
    const options = data?.filter((tag: { tipo_tag: string | undefined }) => tag.tipo_tag === etapa.tipo_tag)
      .map((tag: { cd_tag: any; tag: any }) => ({ id: tag.cd_tag, title: tag.tag })).sort((a: any, b: any) => a.title.localeCompare(b.title)) || [];
    return { ...etapa, options };
  });

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

  function back() {
    if (pathname === '/preference') {
      router.replace('/(menu)/')
    } else {
      router.back()
    }
  }

  function nextProgress() {
    if (stage === (lastQuestion)) {
      back()
    }

    if (stage < (lastQuestion)) {
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

  const currentStage = optionsByStage[stage];
  const currentStageOptions = selectedOptions[currentStage.id] || [];

  return (
    <FlatList
      className='bg-white'
      data={currentStage.options}
      contentContainerStyle={{ padding: 30, flexGrow: 1, justifyContent: 'center', alignContent: 'center' }}
      renderItem={({ item }) => {
        const isSelected = currentStageOptions.includes(item.id);
        return (
          <TouchableOpacity
            className={classNames(
              'my-2 justify-center items-center p-6 rounded-xl',
              { 'bg-surface-brand-main-selected border-2 border-surface-brand-main-selected': isSelected },
              { 'border-2 border-[#528A8C] bg-[#EEEEEE]': !isSelected }
            )}
            onPress={() => handleSelectOption(currentStage.id, item.id)}
          >
            <Text
              className={classNames(
                'color-[#528A8C] font-outfit-600 text-lg',
                { 'color-white': isSelected },
                { 'color-[#528A8C]': !isSelected }
              )}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      }}
      ListHeaderComponentStyle={{ marginBottom: 30 }}
      ListHeaderComponent={
        <>
          <View className='flex-row items-center gap-6 s'>
            <Ionicons name="chevron-back-outline" size={32} color="black" onPress={back} />
            <Text className='color-[#374151] font-inter-400 text-lg'>Preferências</Text>
          </View>
          <ProgressBar progress={statusBarProgress} />
          <Text className='text-4xl font-inter-500 color-[#528A8C]'>{etapas[stage].title}</Text>
          {etapas[stage]?.subtitle && <Text>{etapas[stage].subtitle}</Text>}
          {/* <AgeSelector /> */}
          {/* <View className='w-full bg-surface-brand-main-default h-12'>
            <Text className=''>Ola</Text>
          </View> */}
          {stage === lastQuestion &&

            <>
              <AgeSelector setAge={setAge} />
            </>
          }
        </>
      }
      ListFooterComponentStyle={{ marginTop: 30, flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
      ListFooterComponent={
        < View className='flex-row' >
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
          {/* <Button mediumButton variant='active' title={(lastQuestion) === stage ? "Concluir" : "Próximo"} onPress={nextProgress} disabled={currentStageOptions.length === 0} /> */}
          <TouchableOpacity
            className='justify-center items-center border-1 p-6 border-[#528A8C] rounded-3xl'
            style={{ backgroundColor: lastQuestion !== stage && currentStageOptions.length === 0 ? '#708788' : '#528A8C', flex: 1 }}
            onPress={nextProgress} disabled={lastQuestion !== stage && currentStageOptions.length === 0} >
            <Text className='color-[#FFFFFF] font-inter-500 text-lg'>
              {(lastQuestion) === stage ? "Concluir" : "Próximo"}
            </Text>
          </TouchableOpacity>
        </View >
      }
    />
  )
}