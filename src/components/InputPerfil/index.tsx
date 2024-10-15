import React, { useState } from 'react'
import { View, Text, TextInput, TextInputProps } from 'react-native'
import { Icons } from '../Icons'
import classNames from 'classnames';

interface InputPerfilProps extends TextInputProps {
  multiline: boolean;
  isEditable: boolean;
  label: string

}

function InputPerfil({ multiline = false, isEditable = true, label, ...rest }: InputPerfilProps) {
  const [aboutYou, setAboutYou] = useState('')
  return (

    <View className={classNames('bg-[#F4F4F4] w-full rounded-md px-5 py-4 m-2 gap-3', {
      'flex-column min-h-32': multiline,

    }, { 'flex-row': !multiline })}>
      <View className={classNames({ 'flex-row justify-between items-center': !multiline }, {
        'w-full flex-row justify-between': multiline
      })}>
        <Text className='color-[#8A8A8A] font-roboto-500 text-base'>{label}</Text>
        {multiline && <Text className='color-[#8A8A8A] font-roboto-500 text-xs'>{aboutYou.length}/164</Text>}

      </View>
      <View className={classNames({ 'flex-1 flex-row gap-3  items-center': !multiline })}>
        <TextInput placeholder={label} placeholderTextColor={'#000'} className={classNames('text-base font-roboto-500 ', { 'flex-1 text-right': !multiline })} editable={isEditable} multiline={multiline} value={aboutYou} onChangeText={(e) => setAboutYou(e)} {...rest} />

        {(!isEditable || (multiline && aboutYou.length <= 0)) &&
          <View className={classNames(' bg-[#F4F4F4]  rounded-md ', {
            "absolute right-0 top-1": multiline
          },
          )}>
            <Icons.pencil color={'#000'} width={20} height={20} />
          </View>
        }
      </View>

    </View >
  )
}

export default InputPerfil