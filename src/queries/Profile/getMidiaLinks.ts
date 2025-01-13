import { api } from "@/services/api";
import { MidiaLinks, userStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query"

interface getMidiaLinksProps {
  id: string
}

async function getMidiasLinks(id: string, setMidiaLinks: (midiaSocialLinks: MidiaLinks[]) => void) {
  const { data } = await api.get(`midia-perfil/${id}`)

  const dataMidiasLinks = data
  console.log("🚀 ~ getMidiasLinks ~ data:", data)

  setMidiaLinks(data)

  return dataMidiasLinks;
}



export function useGetMidiaLinks(id: string) {
  const { setMidiaLinks } = userStore()
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getMidiaLinks'],
    queryFn: () => getMidiasLinks(id, setMidiaLinks)

  })

  return { data, error, isLoading, refetch };
}