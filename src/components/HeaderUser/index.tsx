import React from 'react'
import { View, Text } from 'react-native'
import InputImage from '../InputImage'
import IconEdit from '../IconEdit'


interface HeaderUserProps {
  userName?: string,
  occupation?: string,
  image?: string,
  color?: string,
  onOpen?: () => void

}

export default function HeaderUser({ color, userName, occupation, image, onOpen }: HeaderUserProps) {
  return (
    <View className='items-center mt-10 mb-8 w-full'>
      <InputImage image={image} color={color} isEdit={false} onOpen={onOpen} />

      <View className=' mt-9 w-72'>
        <IconEdit colorIcon='#000' sizeIcon={20} className='absolute bottom-2 right-0 bg-[#F4F4F4] p-2 rounded-md m-2 z-10' onPress={onOpen} />
        <View className='items-center'>
          <Text className='font-roboto-500 text-3xl text-center'>{userName ? userName : 'Seu Nome'}</Text>
          <Text className='font-roboto-400 text-sm'>{occupation ? occupation : 'Profissão'}</Text>
        </View>
      </View>
    </View>
  )
}
