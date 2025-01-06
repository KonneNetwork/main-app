import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

interface SendMessageRequest {
  codCountry: string
  phoneNumber: string
}

interface SendMessageProps {
  onChange: () => void
}

async function sendMessage(data: SendMessageRequest) {
  console.log('passou aqui')
  const fullNumber = data.codCountry + data.phoneNumber
  try {
    const resultado = await api.post('/send-message', { phone: fullNumber })
    console.log("🚀 ~ sendMessage ~ resultado:", resultado.data)
  } catch (error) {
    console.log
    throw error
  }
}

export function useSendMessage({ onChange }: SendMessageProps) {

  return useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: (data: SendMessageRequest) => sendMessage(data),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Mensagem enviado com sucesso'
      })
      onChange();
    },
    onError: async(err) => {
      console.log(err)
      if (err instanceof AxiosError) {
        console.log("🚀 ~ onError:async ~ err:", err.response?.data)
        Toast.show({
          type: 'error',
          text1: 'Mensagem de erro',
          text2: await err.response?.data || 'Houve um erro tente novamente'
        })
      }
    }
  })
}