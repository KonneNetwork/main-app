import { StatusKonnexao } from "@/app/(private)/buscar";
import { api } from "@/services/api"
import { queryClient } from "@/services/query";
import { QueryClient, useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

export interface KonnexaoProps {
  status_conexao?: StatusKonnexao;
  cd_usuario: String;
  cd_convidado: String;
}

interface useProps {
  onClose: () => void
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

export default function useCreateKonnexao({ onClose }: useProps) {
  return useMutation({
    mutationKey: ["createKonnexao"],
    mutationFn: (data: KonnexaoProps) => createKonnexao(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getKonnexoes", data.cd_usuario] });
      queryClient.refetchQueries({ queryKey: ["getKonnexoes", data.cd_usuario] });

      Toast.show({
        type: 'success',
        text1: 'konnexão criada com sucesso!'
      });
      onClose();
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        onClose()
        Toast.show({
          type: 'info',
          text1: `${err.response?.data.error}`
        })
        console.log(err.response?.data.error)
      }
    }
  })
}