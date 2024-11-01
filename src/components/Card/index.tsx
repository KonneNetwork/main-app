import { FontAwesome5 } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface CardProps extends TouchableOpacityProps {
  nome: string;
  descricao: string;
  distance: number;
}

export default function Card({ nome, descricao, distance, ...rest }: CardProps) {
  const [distanceConvert, setDistanceConvert] = useState('')


  useEffect(() => {
    if (distance >= 1000) {
      setDistanceConvert(`${distance / 1000} kms`)
    } else if (distance >= 1 && distance < 1000) {
      setDistanceConvert(`${distance} mts`)
    }
  }, [])
  return (

    <TouchableOpacity className='rounded-2xl overflow-hidden' style={{ width: 286, height: 233 }} {...rest}>
      <LinearGradient
        colors={['#00000000', '#0000006f']}
        style={{ width: 286, height: 233, justifyContent: 'flex-end' }}
      >
        <View className='gap-2 p-4'>
          <View className='flex-row justify-between'>
            <Text className='color-[#F9F9F9] font-inter-600 text-lg'>{nome}</Text>
            <FontAwesome5 name="heart" size={22} color="#9E9E9E" />
          </View>
          <Text
            className="color-[#EBEBF5CC] font-inter-400 text-sm"
            style={{ flexShrink: 1 }}
          >
            {descricao.length > 150 ? `${descricao.substring(0, 147)}...` : descricao}
          </Text>
          <Text className='color-[#F9F9F9] text-xs'>{distanceConvert}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>

  )
}
