import { api } from "@/services/api";
import { queryClient } from "@/services/query";
import { userStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

interface Props {
  id: string,
  statusKonnexao: string
}

async function updateStatusConnection({ id, statusKonnexao }: Props) {
  try {
    const statusUpdate = api.put(`/konnection-status/${id}`, { status_conexao: statusKonnexao })
    return statusUpdate;
  } catch (error) {
    throw error
  }
}

export function useUpdateStatusConnection() {
  const { userInfo } = userStore()
  return useMutation({
    mutationKey: ["updateStatusConnection"],
    mutationFn: ({ id, statusKonnexao }: Props) => updateStatusConnection({ id, statusKonnexao }),
    onSuccess: (data) => {
      console.log("🚀 ~ useUpdateStatusConnection ~ data:", data.data)
      queryClient.invalidateQueries({ queryKey: ["getKonnexoes", userInfo?.cdUsuario] });
      queryClient.refetchQueries({ queryKey: ["getKonnexoes", userInfo?.cdUsuario] });
      queryClient.invalidateQueries({ queryKey: ["getKonnexoes", userInfo?.cdUsuario, userInfo?.latitude, userInfo?.longitude] });
      queryClient.refetchQueries({ queryKey: ["getKonnexoes", userInfo?.cdUsuario, userInfo?.latitude, userInfo?.longitude] });
      Toast.show({
        type: 'success',
        text1: data.data.status_conexao === "Konnectado" ? 'Adicionou uma nova Konnexão!' : "Recusado com sucesso!"
      });
    }
  })
}