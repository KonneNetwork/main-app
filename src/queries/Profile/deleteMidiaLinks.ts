import { api } from "@/services/api";
import { queryClient } from "@/services/query";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

async function deleteMidiaLinks(id: string) {
  try {
    const resultado = await api.delete(`midia-links/${id}`)
    return resultado
  } catch (error) {
    throw error
  }
}

export function useDeleteMidiaLinks() {
  return useMutation({
    mutationKey: ['deleteMidialinks'],
    mutationFn: (id: string) => deleteMidiaLinks(id),
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['getMidiaLinks', { id }] });
      queryClient.refetchQueries({ queryKey: ['getMidiaLinks', { id }] });
      Toast.show({
        type: 'success',
        text1: 'link apagado com sucesso!'
      });

    },
    onError: (err) => {
      console.log(err)
      if (err instanceof AxiosError) {
        err.response?.data
        Toast.show({
          type: 'error',
          text1: 'Mensagem de erro',
          text2: err.response?.data || 'Houve um erro tente novamente'
        })
      }
    }
  })
}