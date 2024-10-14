import React, { useState } from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import Input from '@/components/Input'
import classNames from 'classnames'
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'
import Button from '@/components/Button'
import VerificationCodeInput from '@/components/VerificationInput'

interface SignUpProps {
  signUp: boolean;
  setSignUp: (value: React.SetStateAction<boolean>) => void
}

function SignUp({ signUp, setSignUp }: SignUpProps) {
  const [codCountry, setCodCountry] = useState<string | undefined>(undefined);
  const [numberPhone, setNumberPhone] = useState<string | undefined>(undefined);
  const [codeVerification, setCode] = useState('');
  const [stage, setStage] = useState<'phone' | 'cod' | 'sign-up'>("phone")

  const Titulos = [{
    phone: "Criar Conta",
    cod: 'Validação',
    "sign-up": "Concluir Cadastro",
  }]


  function handleContainerSignUp() {
    setSignUp(!signUp)
    setStage('phone')
    setCodCountry(undefined)
    setNumberPhone(undefined)
  }

  function handleSubmitPhoneNumber() {
    if (codCountry != undefined && codCountry !== '' && numberPhone != undefined && numberPhone !== '') {
      setStage('cod')
    }
  }

  function handleSubmitCod() {
    console.log('code', codeVerification)
    if (codeVerification.length === 6) {
      setStage('sign-up')
    }
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
            className="text-base font-inter-medium500 color-surface-brand-default">
            Novo por aqui?
          </Text>
          <Text className='text-3xl font-inter-bold700'>
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

      {(signUp && stage == 'phone') && <View className='flex-1 justify-between'>
        <View>
          <View className="flex-row gap-3 mt-6 ">
            <Input
              value={codCountry}
              onChangeText={setCodCountry}
              label='País'
              styleContainer={{ width: '25%' }} styleInput={{ textAlign: 'center' }}
              keyboardType='phone-pad'
            />
            <Input
              value={numberPhone}
              onChangeText={setNumberPhone}
              label='DDD + telefone'
              styleContainer={{ width: '72%' }}
              keyboardType='phone-pad'
            />



          </View>
          <Text className='w-full font-inter-regular400 text-base color-[#506773]'>Você vai receber um código via SMS para confirmar seu número</Text>
          <Button title="Enviar" onPress={handleSubmitPhoneNumber} />
        </View>

        <View className='self-center flex-row gap-2'>
          <Text className='color-[#506773]'>
            Já tem uma conta?
          </Text>
          <TouchableOpacity onPress={handleContainerSignUp}>
            <Text>Entrar.</Text>
          </TouchableOpacity>

        </View>


      </View>}


      {(signUp && stage == 'cod') && <>
        <View className=" mt-9 flex-1">
          <VerificationCodeInput setCodeNumber={setCode} />
        </View>
        <View className='flex-row mt-1'>
          <Text className=' font-inter-regular400 text-base color-[#506773]' >Enviamos um código para </Text>
          <Text className=' font-inter-regular400 text-base'>{codCountry} {numberPhone}</Text>
        </View>


        <Button title="Enviar" onPress={handleSubmitCod} />

      </>}

      {(signUp && stage == "sign-up") && <View className='flex-1 justify-between'>

        <View className=" mt-9 ">
          <Input label='Nome Completo' />
          <Input label='E-mail' />
          <Input label='CPF' />
          <Input label='Defina uma senha' />
          <Button title="Concluir Cadastro" onPress={handleSubmitCod} />
        </View>



        <View className='self-center  mt-9 items-center'>
          <Text className='color-[#506773]'>
            Ao continuar você concorda com os
          </Text>
          <View className='self-center flex-row items-center'>
            <TouchableOpacity onPress={handleContainerSignUp}>
              <Text>Termos de Uso </Text>
            </TouchableOpacity>
            <Text className='color-[#506773]'>e</Text>
            <TouchableOpacity onPress={handleContainerSignUp}>
              <Text> Políticas de Privacidade.</Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>}

    </View >
  )
}

export default SignUp