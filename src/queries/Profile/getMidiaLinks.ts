import { api } from "@/services/api";
import { Profile, userStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query"

interface getMidiaLinksProps {
  id: string
}

async function getMidiasLinks(id: string, setSocialMidiaLinks: (item: any[]) => void) {
  const { data } = await api.get(`midia-perfil/${id}`)
  const dataMidiasLinks = data.length >= 2 ? data.sort((a: { data_criacao: string | number | Date; }, b: { data_criacao: string | number | Date; }) => new Date(b.data_criacao) - new Date(a.data_criacao)) : data
  setSocialMidiaLinks(dataMidiasLinks)
  return dataMidiasLinks;
}



export function useGetMidiaLinks(id: string) {
  const { setSocialMidiaLinks } = userStore()
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getMidiaLinks', { id }],
    queryFn: () => getMidiasLinks(id, setSocialMidiaLinks)

  })

  return { data, error, isLoading, refetch };
}