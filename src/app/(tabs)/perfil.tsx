import { Icons } from '@/components/Icons'
import React, { useState } from 'react'
import { Keyboard, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Feather from '@expo/vector-icons/Feather';
import InputPerfil from '@/components/InputPerfil';

function Perfil() {

  const [aboutYou, setAboutYou] = useState('')

  return (

    <View className='flex-1 bg-white items-center p-8'>
      <Text className='font-roboto-700 text-xl '>Meu Perfil</Text>

      {/*Header layout*/}
      <View className='items-center mt-10 mb-8 w-full'>
        <View>
          <View className='border-8 border-surface-brand-default h-44 w-44 rounded-full items-center overflow-hidden'>
            <Icons.user width={160} height={160} color={'#528A8C'} />
          </View>
          {/*Icone de edição*/}
          <View className='absolute bottom-0 right-0 bg-[#222222]/30 p-2 rounded-full m-2'>
            <Icons.pencil color={'#fff'} width={20} height={20} />
          </View>

        </View>
        <View className=' mt-9 w-72'>
          <View className='absolute bottom-2 right-0 bg-[#F4F4F4] p-2 rounded-md m-2'>
            <Icons.pencil color={'#000'} width={20} height={20} />
          </View>
          <View className='items-center'>
            <Text className='font-roboto-500 text-3xl'>Seu Nome</Text>
            <Text className='font-roboto-400 text-sm'>Profissão</Text>
          </View>
        </View>
      </View>

      <InputPerfil isEditable={false} multiline={false} label='Profissão' placeholder='Sua Profissão' />
      <InputPerfil isEditable={true} multiline={true} label='Nome' placeholder='Escreva um texto de apresentação ...' />


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