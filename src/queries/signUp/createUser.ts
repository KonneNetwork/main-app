import { api } from "@/services/api"
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

interface CreateUserRequest {
  name: string,
  email: string,
  cpf: string,
  passwd: string
}

interface CreateUserProps {
  onClose: () => void
}

async function createUser(data: CreateUserRequest) {

  try {
    const resultado = await api.post('/sign-up', {
      nome_usuario: data.name,
      email: data.email,
      documento: data.cpf,
      senha: data.passwd,
    });
    console.log("🚀 ~ CreateUser ~ data:", resultado.data)

  } catch (error) {
    throw error
  }
}

export function useCreateUser({ onClose }: CreateUserProps) {
  return useMutation({
    mutationKey: ['createUser'],
    mutationFn: (data: CreateUserRequest) => createUser(data),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Conta criada com sucesso!'
      });

      onClose();
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        console.log("🚀 ~ useCreateUser ~ err:", err.response?.data)
        Toast.show({
          type: 'error',
          text1: 'Mensagem de erro',
          text2: err.response?.data.error || 'Houve um erro tente novamente'
        })
      }
    }
  });
}