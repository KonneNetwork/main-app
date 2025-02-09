import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import Button from '../Button'

interface UserCardProps {
  name: string;
  occupation?: string;
  distance?: number;
  titleButtonActive?: string;
  titleButtonInactive?: string;
  image?: string;
  onChangeInactive?: () => void
  onChangeActive?: () => void
  thema: string;
  imageCardSize?: number;
  aba: string
}

export default function CardUsers({ name, distance, occupation, titleButtonActive = '', titleButtonInactive = "", aba, image, onChangeActive, onChangeInactive, thema, imageCardSize = 80 }: UserCardProps) {

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
      <View className='flex-row items-center justify-between py-3 gap-2 rounded-md'>
        <View className='flex-row items-center  flex-1 gap-5'>
          <View className='bg-[#D9D9D9] rounded-full overflow-hidden' style={{ borderWidth: 2, borderColor: thema, height: imageCardSize, width: imageCardSize }}>
            {image && <Image source={{ uri: image }} className='w-full h-full' />}

          </View>
          <View className=' flex-1'>
            <Text className='font-inter-600 text-lg'>{name}</Text>
            {occupation && <Text className='font-inter-400 text-base text-[#3C3C4399]/60'>{occupation} {occupation && distanceConvert && "-"} {distanceConvert && distanceConvert}</Text>}

          </View>
        </View>
        <View className='gap-3'>
          {onChangeActive && <Button smallButton title={titleButtonActive} variant='active' onPress={onChangeActive} />}

          {(aba === "Pendente" && onChangeInactive) && <Button smallButton title={titleButtonInactive} variant='inactive' onPress={onChangeInactive} />}
        </View>

      </View>
    </>
  )
}
