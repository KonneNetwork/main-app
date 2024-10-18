import React from 'react';
import { View, TextInputProps, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface InputSearchProps extends TextInputProps { }

export default function InputSearch({ ...rest }: InputSearchProps) {
  return (
    <View className='mt-10 flex-row items-center gap-3 p-2 bg-[#f4f4f4] rounded-xl' >
      <Ionicons name="search" size={30} color="black" className='ml-2' />
      <TextInput className='py-3 flex-1 color-[#8A8A8A]' placeholder='Buscar por links' {...rest} />
    </View>
  )
}
