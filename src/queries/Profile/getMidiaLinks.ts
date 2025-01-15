import { api } from "@/services/api";
import { userStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query"

interface getMidiaLinksProps {
  id: string
}

async function getMidiasLinks(id: string, setSocialMidiaLinks: (item: any[]) => void, socialMidiaLinks: any[] | null) {
  const { data } = await api.get(`midia-perfil/${id}`)
  const dataMidiasLinks = data
  setSocialMidiaLinks(data)
  return dataMidiasLinks;
}



export function useGetMidiaLinks(id: string) {
  const { setSocialMidiaLinks, socialMidiaLinks } = userStore()
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getMidiaLinks', { id }],
    queryFn: () => getMidiasLinks(id, setSocialMidiaLinks, socialMidiaLinks)

  })

  return { data, error, isLoading, refetch };
}