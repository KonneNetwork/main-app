import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Icons } from '../Icons'
import InputImage from '../InputImage'
import IconEdit from '../IconEdit'


interface HeaderUserProps {
  userName?: string,
  occupation?: string,
  image?: string,
  onOpen?: () => void

}

export default function HeaderUser({ userName, occupation, image, onOpen }: HeaderUserProps) {
  return (
    <View className='items-center mt-10 mb-8 w-full'>
      <InputImage image={image} isEdit={false} onOpen={onOpen} />

      <View className=' mt-9 w-72'>
        <IconEdit colorIcon='#000' sizeIcon={20} className='absolute bottom-2 right-0 bg-[#F4F4F4] p-2 rounded-md m-2 z-10' onPress={onOpen} />
        <View className='items-center'>
          <Text className='font-roboto-500 text-3xl'>{userName ? userName : 'Seu Nome'}</Text>
          <Text className='font-roboto-400 text-sm'>{occupation ? occupation : 'Profissão'}</Text>
        </View>
      </View>
    </View>
  )
}
