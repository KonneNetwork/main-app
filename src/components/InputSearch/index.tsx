import React from 'react';
import { View, TextInputProps, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import classNames from 'classnames';

interface InputSearchProps extends TextInputProps {
  placeholder?: string;
  smallSearch?: boolean;
}

export default function InputSearch({ smallSearch = false, placeholder, ...rest }: InputSearchProps) {
  return (

    <View className={classNames('flex-row items-center',
      { 'mt-10  gap-3 p-2 bg-[#f4f4f4] rounded-2xl': !smallSearch },
      { 'w-2/6 gap-1  border-2 border-[#E7EEF0] rounded-xl': smallSearch })}
    >
      <Ionicons name="search" size={smallSearch ? 22 : 30} color="black" className={classNames({ 'ml-2': !smallSearch }, { 'ml-1': smallSearch })} />
      <TextInput className={classNames('flex-1',
        {
          'py-3  color-[#8A8A8A] font-roboto-400 text-base': !smallSearch
        },
        {
          'p-1  text-sm font-inter-400 color-[#506773]': smallSearch
        })} placeholder={placeholder} {...rest} />
    </View>

  )
}
