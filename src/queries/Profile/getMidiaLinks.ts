import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query"

interface getMidiaLinksProps {
  id: string
}

async function getMidiasLinks(id: string) {
  const { data } = await api.get(`midia-perfil/${id}`)

  const dataMidiasLinks = data
  console.log("🚀 ~ getMidiasLinks ~ data:", data)

  return dataMidiasLinks;
}



export function useGetMidiaLinks(id: string) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getMidiaLinks'],
    queryFn: () => getMidiasLinks(id)

  })

  return { data, error, isLoading, refetch };
}