import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

async function getTagsSelected(id: string) {
  const { data } = await api.get(`/get-preferences/${id}`);
  return data;
}


export default function useGetTagsSelected(id: string) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getTagsSelected'],
    queryFn: () => getTagsSelected(id)
  })

  return { data, error, isLoading, refetch };
}