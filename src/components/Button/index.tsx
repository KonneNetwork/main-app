import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

interface ButtonProps {
  title: string
}

function Button({ title }: ButtonProps) {
  return (
    <TouchableOpacity
      className="bg-[#528A8C] justify-center items-center py-6 rounded-xl mt-8"
    >
      <Text
        className="color-white text-lg font-medium "
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default Button