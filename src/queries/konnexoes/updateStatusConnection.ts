import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

async function updateStatusConnection(id: string) {
  try {
    const statusUpdate = api.put(`/konnection-status/${id}`, { status_conexao: "Konnectado" })
    return statusUpdate;
  } catch (error) {
    throw error
  }
}

export function useUpdateStatusConnection() {
  return useMutation({
    mutationKey: ["updateStatusConnection"],
    mutationFn: (id: string) => updateStatusConnection(id)
  })
}