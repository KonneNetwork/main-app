import React, { useState } from 'react'
import { TextInput, View, Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import classNames from 'classnames';


interface InputProps {
  label: string;
  password?: boolean;
}

function Input({ label, password = false }: InputProps) {
  const [visiblePassword, setVisiblePassword] = useState(true)

  function handleVisiblePassword() {
    setVisiblePassword(!visiblePassword)
  }

  return (
    <View
      className='mt-5 mb-2 border-gray-500 border-2 bg-[#ffffff2b] rounded-xl w-full '
    >
      <View
        className='absolute top-[-14px] left-[15px] px-2'
      >
        <Text
          className='text-base color-white'
        >
          {label}
        </Text>
      </View>
      <View className='flex-row items-center   w-full'>
        <TextInput
          className={classNames('color-white p-3  w-full ',
            {
              'w-[90%]': password === true
            }
          )}
          secureTextEntry={(password && visiblePassword) && visiblePassword}
          autoCapitalize='none'
        />
        {password &&

          (visiblePassword ?
            <Ionicons
              name="eye"
              size={26}
              color="white"
              onPress={handleVisiblePassword}
            />
            : <Ionicons
              name="eye-off-sharp"
              size={26}
              color="white"
              onPress={handleVisiblePassword}
            />
          )
        }

      </View>
    </View>
  );
}

export default Input