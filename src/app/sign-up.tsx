import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Input from '@/components/Input'
import classNames from 'classnames'
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'
import Button from '@/components/Button'

interface SignUpProps {
  signUp: boolean;
  setSignUp: (value: React.SetStateAction<boolean>) => void
}

function SignUp({ signUp, setSignUp }: SignUpProps) {
  const [codCountry, setCodCountry] = useState<string | undefined>(undefined);
  const [numberPhone, setNumberPhone] = useState<string | undefined>(undefined);
  const [stage, setStage] = useState<'phone' | 'cod' | 'sign-up'>('phone')

  function handleSignUp() {
    setSignUp(!signUp)
    setStage('phone')
  }

  function handleSubmitPhoneNumber() {
    if (codCountry != undefined && codCountry !== '' && numberPhone != undefined && numberPhone !== '') {
      setStage('cod')
    }
  }

  return (
    <View className={classNames("bg-white  rounded-t-[30px] py-10 px-8",
      {
        'flex-grow': signUp
      }
    )}>
      <View className="flex-row items-center justify-between">
        <View>
          <Text
            className="text-base font-inter-medium500 color-[#528A8C]">
            Novo por aqui?
          </Text>
          <Text className='text-3xl font-inter-bold700'>
            Criar conta
          </Text>
        </View >
        <TouchableOpacity
          className="bg-[#528A8C2b] rounded-3xl items-center p-5 w-20 self-center border-2 border-white"
          onPress={handleSignUp}
        >
          {signUp ? <AntDesign
            name="close"
            size={32}
            color="#528A8C" />
            :
            <Feather
              name="arrow-up-right"
              size={32}
              color="#528A8C" />}
        </TouchableOpacity>
      </View >

      {(signUp && stage == 'phone') && <>
        <View className="flex-row gap-3 mt-6 ">
          <Input
            value={codCountry}
            onChangeText={setCodCountry}
            label='País'
            styleContainer={{ width: '25%' }} styleInput={{ textAlign: 'center' }} />
          <Input
            value={numberPhone}
            onChangeText={setNumberPhone}
            label='DDD + telefone'
            styleContainer={{ width: '74%' }} />

        </View>
        <Button title="Enviar" onPress={handleSubmitPhoneNumber} />

      </>}



    </View >
  )
}

export default SignUp