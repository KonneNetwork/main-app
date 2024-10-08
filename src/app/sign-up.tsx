import React from 'react'
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

  function handleSignUp() {
    setSignUp(!signUp)
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
            className="text-base font-medium color-[#528A8C]">
            Novo por aqui?
          </Text>
          <Text className='text-3xl font-bold'>
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

      {signUp && <>
        <View className="flex-row gap-3 mt-6">
          <Input

            label='País'
            style={{ width: '30%' }} />
          <Input
            label='DDD + telefone'
            style={{ width: '68%' }} />

        </View>
        <Button title="Enviar" />

      </>}



    </View >
  )
}

export default SignUp