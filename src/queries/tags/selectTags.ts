import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

interface tagsProps {
  selectedOptions: { [key: string]: string[] };
  age: number;
}

interface selectTagsProps {
  data: tagsProps;
  id: string
}

async function selectTags({ id, data }: selectTagsProps) {
  try {
    const resultado = await api.post(`add-preferences/${id}`, { ...data })

    console.log("🚀 ~ selectTags ~ resultado:", resultado.data)
  } catch (error) {
    throw error
  }

}

export default function useSelectTags(id: string) {
  return useMutation({
    mutationKey: ['selectedTags'],
    mutationFn: (data: selectTagsProps) => selectTags({ id, data }),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Tags salvas com sucesso!'
      });

      // onClose();
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
  })
}