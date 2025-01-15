import { api } from "@/services/api";
import { queryClient } from "@/services/query";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

interface CreateSocialMidiaLink {
  cdPerfil: string,
  cdSocialMidia: string,
}

async function createMidiaSocialLink({ cdPerfil, cdSocialMidia }: CreateSocialMidiaLink) {

  try {
    const resultado = await api.post('midia-links', {
      cd_perfil: cdPerfil,
      cd_social_midia: cdSocialMidia,

    })
    return resultado.data
  } catch (error) {
    throw error
  }

}

export function useCreateSocialMidiaLink(id: string, onClosed: () => void) {
  return useMutation({
    mutationKey: ["createMidiaSocialLink"],
    mutationFn: (data: CreateSocialMidiaLink) => createMidiaSocialLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMidiaLinks', { id }] });
      queryClient.refetchQueries({ queryKey: ['getMidiaLinks', { id }] });
      Toast.show({
        type: 'success',
        text1: 'midia adicionada com sucesso!'
      });
      onClosed();
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.error)
      }
    }

  })
}