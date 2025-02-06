import { api } from "@/services/api"
import { useMutation, useQuery } from "@tanstack/react-query"

async function getKonnexoes(id: string | undefined) {
  try {
    const resultado = await api.get(`/pendents/${id}`)
    return resultado.data
  } catch (error) {
    throw error
  }
}

export default function useGetKonnexoes(id: string | undefined) {
  return useQuery({
    queryKey: ["getKonnexoes"],
    queryFn: () => getKonnexoes(id),
  })
}