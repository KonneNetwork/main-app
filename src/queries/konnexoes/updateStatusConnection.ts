import { api } from "@/services/api";
import { queryClient } from "@/services/query";
import { userStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

async function updateStatusConnection(id: string) {
  try {
    const statusUpdate = api.put(`/konnection-status/${id}`, { status_conexao: "Konnectado" })
    return statusUpdate;
  } catch (error) {
    throw error
  }
}

export function useUpdateStatusConnection() {
  const {userInfo} = userStore()  
  return useMutation({
    mutationKey: ["updateStatusConnection"],
    mutationFn: (id: string) => updateStatusConnection(id),
    onSuccess:(id)=>{
      queryClient.invalidateQueries({queryKey:["getKonnexoes", userInfo?.cdUsuario]});
      queryClient.refetchQueries({queryKey:["getKonnexoes", userInfo?.cdUsuario]});
      Toast.show({
              type: 'success',
              text1: 'Adicionou uma nova Konnexão!'
            });
    }
  })
}