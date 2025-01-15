import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

async function getTags() {
  const { data } = await api.get(`/tags`);

  return data;
}


export default function useGetTags() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getTags'],
    queryFn: () => getTags()
  })

  return { data, error, isLoading, refetch };
}