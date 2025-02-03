import { api } from "@/services/api"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

interface KonnexaoProps {
  cd_usuario: String;
  cd_convidado: String;
}

async function createKonnexao(data: KonnexaoProps) {
  try {
    const resultado = await api.post('/konnection', {
      cd_usuario: data.cd_usuario,
      cd_convidado: data.cd_convidado
    })
    return resultado.data;
  } catch (error) {
    throw error
  }
}

export default function useCreateKonnexao() {
  return useMutation({
    mutationKey: ["createKonnexao"],
    mutationFn: (data: KonnexaoProps) => createKonnexao(data),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'konnexão criada com sucesso!'
      });

    },
    onError: (err) => {
      if (err instanceof AxiosError) {

        Toast.show({
          type: 'info',
          text1: `${err.response?.data.error}`
        })
        console.log(err.response?.data.error)
      }
    }
  })
}