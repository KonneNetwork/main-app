import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Platform, ScrollView, KeyboardAvoidingView } from 'react-native'
import classNames from 'classnames'
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'
import { InitialStage } from '@/components/StagesForgotPassword/initialStage'
import { CodeStage } from '@/components/StagesForgotPassword/codeStage'
import { FinalStage } from '@/components/StagesForgotPassword/finalStage'

interface SignUpProps {
  forgotPasswd: boolean;
  setForgotPasswd: (value: React.SetStateAction<boolean>) => void
}



function ForgotPassword({ forgotPasswd, setForgotPasswd }: SignUpProps) {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [stage, setStage] = useState<'phone' | 'cod' | 'sign-up'>("phone")

  const Titulos = [{
    phone: "Esqueceu sua senha",
    cod: 'Validação',
    "sign-up": "Concluir Cadastro",
  }]


  function handleContainerForgotPasswd() {
    setForgotPasswd(!forgotPasswd)
    setStage('phone')
  }

  function handleOnClose() {
    setForgotPasswd(false)
  }



  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }} showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps="handled">
        <View className={classNames("bg-white  rounded-t-[30px] py-10 px-8 "
        )}>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className='text-3xl font-inter-700'>
                {Titulos[0][stage]}
              </Text>
            </View >
            <TouchableOpacity
              className="bg-[#506773]/10 rounded-3xl items-center p-5 w-20 self-center border-2 border-white"
              onPress={handleContainerForgotPasswd}
            >
              {forgotPasswd ? <AntDesign
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

          {stage == 'phone' && <InitialStage setStage={setStage} setPhoneNumber={setPhoneNumber} onClose={handleOnClose} />}


          {stage == 'cod' && <CodeStage phoneNumber={phoneNumber!} setStage={setStage} />}

          {stage == 'sign-up' && <FinalStage onClose={handleOnClose} />}

        </View >
      </ScrollView>
    </KeyboardAvoidingView >
  )
}

export default ForgotPassword