import React from 'react'
import { TextInput, View, Text } from 'react-native'


interface InputProps {
  label: string;
}

function Input({ label }: InputProps) {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput />
    </View>
  )
}

export default Input