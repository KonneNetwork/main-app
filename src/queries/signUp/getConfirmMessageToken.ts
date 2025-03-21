import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

interface ConfirmMessageTokenRequest {
  phoneNumber: string
}

async function confirmMessageToken({ phoneNumber }: ConfirmMessageTokenRequest) {

  try {
    const { data } = await api.get(`confirm-message/${phoneNumber}`)

    console.log("🚀 ~ confirmMessageToken ~ data:", data)

    return data.cd_verificacao;

  } catch (error) {
    throw error
  }
}


export function useConfirmeMessageToken({ phoneNumber }: ConfirmMessageTokenRequest) {
  console.log("🚀 ~ useConfirmeMessageToken ~ phoneNumber:", phoneNumber)
  return useQuery({
    queryKey: ['confirmMessageToken', { phoneNumber }],
    queryFn: () => confirmMessageToken({ phoneNumber }),
  });
}