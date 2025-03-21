import { View, Text } from "react-native";
import VerificationCodeInput from "../InputVerification";
import Button from "../Button";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useConfirmeMessageToken } from "@/queries/signUp/getConfirmMessageToken";
import Toast from "react-native-toast-message";
import React from "react";


interface CodeStageProps {
  phoneNumber: string;
  setStage: React.Dispatch<React.SetStateAction<"phone" | "cod" | "forgot-passwd">>
}

export function CodeStage({ phoneNumber, setStage }: CodeStageProps) {
  const [token, setToken] = useState('')
  const [code, setCode] = useState('')
  const { data } = useConfirmeMessageToken({ phoneNumber })
  console.log("🚀 ~ CodeStage ~ data:", data)


  async function ConfirmTokenMessage() {
    try {
      const { data } = await api.get(`confirm-message/${phoneNumber}`)
      const resultado = data.cd_verificacao
      setToken(resultado)
    } catch (error) {
      throw error
    }
  }

  const onSubmit = () => {

    if (code.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'verifique se os campos estão preenchidos'
      })
    }

    const resultado = data === code;
    if (resultado) {
      setStage('forgot-passwd')
    } else {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Código incorreto'
      })
    }
  }

  useEffect(() => {
    ConfirmTokenMessage()
  }, [])

  return (
    <>
      <View className=" mt-9 ">
        <VerificationCodeInput setCodeNumber={setCode} />
      </View>
      <View className='flex-row mt-1'>
        <Text className=' font-inter-400 text-base color-[#506773]' >Enviamos um código para {phoneNumber} </Text>
        <Text className=' font-inter-400 text-base'></Text>
      </View>


      <Button variant='active' title="Enviar" onPress={onSubmit} />

    </>)
}