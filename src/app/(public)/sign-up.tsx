import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import classNames from 'classnames'
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'
import { InitialStage } from '@/components/StagesSignUp/initialStage'
import { CodeStage } from '@/components/StagesSignUp/codeStage'
import { FinalStage } from '@/components/StagesSignUp/finalStage'
import { useTranslation } from 'react-i18next'

interface SignUpProps {
  signUp: boolean;
  setSignUp: (value: React.SetStateAction<boolean>) => void
}



function SignUp({ signUp, setSignUp }: SignUpProps) {
  const { t } = useTranslation('translation', { keyPrefix: "SignUp" })
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [stage, setStage] = useState<'phone' | 'cod' | 'sign-up'>("phone")

  const Titulos = [{
    phone: t('create account'),
    cod: t('cod valid'),
    "sign-up": t('end registragion'),
  }]


  function handleContainerSignUp() {
    setSignUp(!signUp)
    setStage('phone')
  }

  function handleOnClose() {
    setSignUp(false)
  }



  return (
    <View className={classNames("bg-white  rounded-t-[30px] py-10 px-8 ",
      {
        'flex-grow': signUp
      }
    )}>
      <View className="flex-row items-center justify-between">
        <View>
          <Text
            className="text-base font-inter-500 color-surface-brand-default">
            {t('question new-user')}
          </Text>
          <Text className='text-3xl font-inter-700'>
            {Titulos[0][stage]}
          </Text>
        </View >
        <TouchableOpacity
          className="bg-[#506773]/10 rounded-3xl items-center p-5 w-20 self-center border-2 border-white"
          onPress={handleContainerSignUp}
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

      {(signUp && stage == 'phone') && <InitialStage setStage={setStage} setPhoneNumber={setPhoneNumber} onClose={handleOnClose} />}


      {(signUp && stage == 'cod') && <CodeStage phoneNumber={phoneNumber!} setStage={setStage} />}

      {(signUp && stage == 'sign-up') && <FinalStage onClose={handleOnClose} />}

    </View >
  )
}

export default SignUp