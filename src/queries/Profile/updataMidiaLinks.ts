import { api } from "@/services/api";
import { queryClient } from "@/services/query";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

async function updateMidiaLinks(id: string, data: { url: string }) {
  try {
    const resultado = await api.put(`midia-links/${id}`, {
      url: data.url
    })
    return resultado
  } catch (error) {
    throw error
  }
}

export function useUpdateMidiaLinks(idSocialMidia: string, id: string, onClosed: () => void) {
  return useMutation({
    mutationKey: ['updateMidiaLinks'],
    mutationFn: (data: { url: string }) => updateMidiaLinks(idSocialMidia, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMidiaLinks', { id }] });
      queryClient.refetchQueries({ queryKey: ['getMidiaLinks', { id }] });
      Toast.show({
        type: 'success',
        text1: 'link adicionado com sucesso!'
      });
      onClosed();
    },
    onError: (err) => {
      console.log(err)
      if (err instanceof AxiosError) {
        Toast.show({
          type: 'error',
          text1: 'Mensagem de erro',
          text2: err.response?.data.message || 'Houve um erro tente novamente'
        })
      }
    }
  })
}