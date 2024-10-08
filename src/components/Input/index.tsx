import React, { useState } from 'react'
import { TextInput, View, Text, TouchableOpacity, TextInputProps } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import classNames from 'classnames';
import { Colors } from 'react-native/Libraries/NewAppScreen';


interface InputProps extends TextInputProps {
  label: string;
  password?: boolean;
  templateWhite?: boolean;
  style?: any
}

function Input({ label, password = false, templateWhite = false, style, ...rest }: InputProps) {
  const [visiblePassword, setVisiblePassword] = useState(true)

  function handleVisiblePassword() {
    setVisiblePassword(!visiblePassword)
  }

  return (
    <View
      className='mt-5 mb-2 border-[#506773] border-2 bg-[#ffffff2b] rounded-xl min-w-max'
      style={style}
    >
      <View
        className={classNames('absolute top-[-14px] left-[15px] px-2', {
          'bg-white': !templateWhite
        })}
      >
        <Text
          className={classNames('text-base color-[#506773]', {
            'color-white': templateWhite
          })}
        >
          {label}
        </Text>
      </View>
      <View className='flex-row items-center w-full min-h-14 justify-around'>
        <TextInput
          className={classNames('color-black p-3 w-[85%]',
            {
              'w-full': !password
            },
            {
              'color-white': templateWhite
            }
          )}
          secureTextEntry={(password && visiblePassword) && visiblePassword}
          autoCapitalize='none'
        />
        {password &&
          <TouchableOpacity onPress={handleVisiblePassword}>
            <Ionicons
              name={visiblePassword ? "eye" : "eye-off-sharp"}
              size={26}
              color="white"

            />
          </TouchableOpacity>

        }
      </View>
    </View>
  );
}

export default Input