import { Icons } from '@/components/Icons'
import React, { useState } from 'react'
import { Keyboard, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Feather from '@expo/vector-icons/Feather';
import InputPerfil from '@/components/InputPerfil';
import HeaderUser from '@/components/HeaderUser';

function Perfil() {

  return (

    <View className='flex-1 bg-white items-center p-8'>
      <Text className='font-roboto-700 text-xl '>Meu Perfil</Text>

      {/*Header layout*/}
      <HeaderUser />

      <InputPerfil isEditable={false} multiline={true} label='Nome' placeholder='Escreva um texto de apresentação ...' />


      <View className='w-full gap-5 mt-6'>
        <Text>Meus links</Text>

        <TouchableOpacity className='flex-row bg-[#F4F4F4] w-full justify-center items-center p-4 gap-3 rounded-lg'>
          <Feather name="plus" size={24} color="black" />
          <Text className='font-roboto-500 text-base'>
            Adicionar link
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Perfil