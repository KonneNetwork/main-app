import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import classNames from 'classnames';
import IconEdit from '../IconEdit';

interface InputPerfilProps extends TextInputProps {
  multiline?: boolean;
  isEditable: boolean;
  label: string
  showEditIcon?: boolean;
  onOpen?: () => void
}

function InputPerfil({ multiline = false, isEditable = true, label, showEditIcon = true, onOpen, ...rest }: InputPerfilProps) {
  const [value, setValue] = useState('')
  return (

    <View className={classNames('bg-[#F4F4F4] w-full rounded-md px-5 py-4 m-2 gap-3', {
      'flex-column min-h-32': multiline,

    }, { 'flex-row': !multiline })}>
      <View className={classNames({ 'flex-row justify-between items-center': !multiline }, {
        'w-full flex-row justify-between': multiline
      })}>
        <Text className='color-[#8A8A8A] font-roboto-500 text-base'>{label}</Text>
        {multiline && <Text className='color-[#8A8A8A] font-roboto-500 text-xs'>{value.length}/164</Text>}

      </View>
      <View className={classNames({ 'flex-1 flex-row gap-3  items-center': !multiline })}>
        <TextInput
          returnKeyType='next'
          placeholder={label}
          placeholderTextColor={'#000'}
          className={classNames('text-base font-roboto-500 ', { 'flex-1 text-right': !multiline })}
          editable={isEditable && value.length <= 164}
          multiline={multiline}
          value={value}
          onChangeText={(e) => setValue(e)} {...rest}
        />

        {(!isEditable || (multiline && value.length <= 0 && showEditIcon)) &&
          <IconEdit sizeIcon={20} colorIcon='#000' onPress={onOpen} className={classNames(' bg-[#F4F4F4]  rounded-md', {
            "absolute right-0 top-1": multiline
          },
          )} />
        }
      </View>

    </View >
  )
}

export default InputPerfil