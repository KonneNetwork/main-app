import React from 'react'
import { TouchableOpacityProps, Text, TouchableOpacity } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  onPress?: () => void
}

function Button({ title, onPress, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className="bg-[#528A8C] justify-center items-center py-6 rounded-xl mt-8"
      onPress={onPress}
      {...rest}
    >
      <Text
        className="color-white text-lg font-inter-medium500 "
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default Button