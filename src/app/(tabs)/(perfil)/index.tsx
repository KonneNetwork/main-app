import { Icons } from '@/components/Icons'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import InputPerfil from '@/components/InputPerfil';
import { Link, router } from 'expo-router';
import HeaderUser from '@/components/HeaderUser';
import InputImage from '@/components/InputImage';
import Button from '@/components/Button';
import EditPerfil from './edit-perfil';
import { StatusBar } from 'expo-status-bar';

function Perfil() {
  const [userName, setUserName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false)

  function handleCloseModal() {
    setOpen(false)
  }

  function hadleOpenModal() {
    setOpen(true)
  }

  return (
    <View className='flex-1'>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          className="bg-surface-primary"
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 30 }}
          showsVerticalScrollIndicator={false}
          bounces={false}

        >
          <Text className='font-roboto-700 text-xl '>Meu Perfil</Text>

          <HeaderUser onOpen={hadleOpenModal} />

          <InputPerfil isEditable={false} multiline={true} label='Nome' placeholder='Escreva um texto de apresentação ...' onOpen={hadleOpenModal} />


          <View className='w-full gap-5 mt-6'>
            <Text>Meus links</Text>
            <Link href={'/(tabs)/(perfil)/add-link'} asChild>
              <TouchableOpacity className='flex-row bg-[#F4F4F4] w-full justify-center items-center p-4 gap-3 rounded-lg'>
                <Feather name="plus" size={24} color="black" />
                <Text className='font-roboto-500 text-base'>
                  Adicionar link
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

          <Modal visible={open} transparent={true} presentationStyle='overFullScreen' animationType='fade' style={{ backgroundColor: '#000', flex: 1 }} >
            <View style={{ flex: 1, backgroundColor: "#0000002f" }}>
              <EditPerfil onClosed={handleCloseModal} />
            </View>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default Perfil