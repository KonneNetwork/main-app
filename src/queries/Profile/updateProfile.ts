import { api } from "@/services/api";
import { queryClient } from "@/services/query";
import { User } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

interface UpdateProfileRequest {
  image: string;
  name: string;
  themeColor: string;
  occupation: string;
  description: string;
}

interface UpdateProfileProps {
  data: UpdateProfileRequest,
  id: string
}


async function updateProfile({ data, id }: UpdateProfileProps) {
  console.log("🚀 ~ createProfile ~ id:", id)
  console.log("🚀 ~ createProfile ~ data:", data)
  try {
    const resultado = await api.put(`perfil/${id}`, {
      foto_perfil: data.image,
      nome_perfil: data.name,
      descricao: data.description,
      ocupacao: data.occupation,
      tema_perfil: data.themeColor
    })
    console.log("🚀 ~ createProfile ~ resultado:", resultado.data)

  } catch (error) {
    throw error
  }
}

export function useUpdateProfile(id: string, onClose: () => void) {
  return useMutation({
    mutationKey: ['createProfile'],
    mutationFn: (data: UpdateProfileRequest) => updateProfile({ data, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProfile', { id }] });
      queryClient.refetchQueries({ queryKey: ['getProfile', { id }] });
      console.log("🚀 ~ useUpdateProfile ~ id:", id)
      Toast.show({
        type: 'success',
        text1: 'Perfil criado com sucesso!'
      });
      onClose();

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