import { MaterialIcons } from '@expo/vector-icons'
import classNames from 'classnames';
import React, { ReactNode } from 'react'
import { TouchableOpacity, View, Text, TouchableOpacityProps, Platform } from 'react-native'

interface CardConfigurationProps extends TouchableOpacityProps {
  children: React.ReactNode;
  title: string;
  bigContainer?: boolean;
}

export default function CardConfiguration({ bigContainer, title, children, ...rest }: CardConfigurationProps) {
  return (
    <TouchableOpacity className={classNames('bg-white w-full flex-row justify-between items-center p-2', {
      'p-6 rounded-xl ': bigContainer
    }, {
      'shadow-sm shadow-black/70': Platform.OS === 'ios' && bigContainer,
    }, {
      'shadow-lg shadow-black/70': Platform.OS === 'android' && bigContainer,
    })} {...rest}>
      <View className='flex-row justify-between items-center gap-4'>
        {children}
        <Text className='color-[#374151] text-lg'>{title}</Text>
      </View>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
    </TouchableOpacity>
  )
}