import { api } from "@/services/api";
import { queryClient } from "@/services/query";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

interface UpdateFirstAccessRequest {
  primeiroAcesso: boolean;
}

interface UpdateFirstAccessProps {
  data: UpdateFirstAccessRequest,
  id: string
}


async function updateFirstAccess({ data, id }: UpdateFirstAccessProps) {
  try {
    const dataTransform = {
      primeiro_acesso: data.primeiroAcesso
    }

    const resultado = await api.put(`user/${id}`, { ...dataTransform })
    return resultado
  } catch (error) {
    throw error
  }
}


export function useUpdateFirstAccess(id: string, onClose: () => void) {
  return useMutation({
    mutationKey: ['updateFirstAccess'],
    mutationFn: (data: UpdateFirstAccessRequest) => updateFirstAccess({ data, id }),
    onSuccess: () => {
      onClose();

    },
    onError: (err) => {
      console.log(err)
      if (err instanceof AxiosError) {
        err.response?.data
      }
    }
  })
}