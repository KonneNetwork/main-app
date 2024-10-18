import Button from '@/components/Button'
import InputImage from '@/components/InputImage'
import InputPerfil from '@/components/InputPerfil'
import { palleteColors } from '@/constants/paletteColor'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native'


interface EditPerfilProps {
  onClosed: () => void
}

export default function EditPerfil({ onClosed }: EditPerfilProps) {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<number | null>(null);



  const handleSelectItem = (id: number) => {
    setSelectedId(id) // Atualiza o estado com o ID do item selecionado
  }


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }} showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps="handled">

        <View className='  w-full items-center gap-2 bg-surface-primary pt-8 px-8 pb-4 rounded-t-[30px]'>
          <InputImage isEdit={true} />
          <InputPerfil
            isEditable={true}
            label='Nome'
            placeholder='Seu Nome'
          />
          <InputPerfil
            isEditable={true}
            label='Profissão'
            placeholder='Sua Profissão'
          />
          <InputPerfil showEditIcon={false} isEditable={true} label='Sobre Você' placeholder='Escreva um texto de apresentação...' multiline />
          <Text className='self-start font-roboto-500 text-sm'>Escolher Tema</Text>
          <FlatList
            style={{ width: '100%' }}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            data={palleteColors}
            horizontal
            renderItem={
              ({ item }) => {
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => handleSelectItem(item.id)}
                    style={{
                      height: 80, width: 80, backgroundColor: item.color, borderRadius: 100, marginHorizontal: 5, borderWidth: selectedId === item.id ? 6 : 0,
                      borderColor: selectedId === item.id ? '#17D7B5' : 'transparent'
                    }}
                  />
                )
              }}
          />


          <View className='flex-row gap-3 w-full'>
            <Button
              variant='inactive'
              title=' Cancelar'
              adaptative={true}
              onPress={onClosed}
            />
            <Button
              variant='active'
              title=' Salvar'
              adaptative={true}
              onPress={onClosed}
            />
          </View>


        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
