import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import Button from '../Button'

interface UserCardProps {
  name: string;
  occupation?: string;
  distance?: number;
  titleButton?: string;
}

export default function CardUsers({ name, distance, occupation, titleButton = '' }: UserCardProps) {

  const [distanceConvert, setDistanceConvert] = useState('')


  useEffect(() => {
    if (distance && distance >= 1000) {
      setDistanceConvert(`${distance / 1000}kms`)
    } else if (distance && distance >= 1 && distance < 1000) {
      setDistanceConvert(`${distance}mts`)
    }
  }, [])

  return (
    <>
      <View className='flex-row items-center justify-between py-3 gap-2'>
        <View className='flex-row items-center  flex-1 gap-5'>
          <View className='bg-[#D9D9D9] w-20 h-20 rounded-full' />
          <View className=' flex-1'>
            <Text className='font-inter-600 text-lg'>{name}</Text>
            <Text className='font-inter-400 text-base text-[#3C3C4399]/60'>{occupation} - {distanceConvert}</Text>
          </View>
        </View>
        <Button smallButton title={titleButton} variant='active' />
      </View>
    </>
  )
}
