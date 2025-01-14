import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

async function getMidias() {

  const { data } = await api.get(`/social-medias`);

  console.log("🚀 ~ getMidias ~ data:", data)
  return data;
}


export default function useGetProfile() {

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getMidias'],
    queryFn: () => getMidias(),
  });

  return { data, error, isLoading, refetch };
}