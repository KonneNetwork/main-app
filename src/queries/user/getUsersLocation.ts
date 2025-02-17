import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

interface QueryLatLon {
  id: string | undefined,
  latitude: number,
  longitude: number
  tags?: string[] | string | null
}

async function getUsersLocation({ id, latitude, longitude, tags }: QueryLatLon) {
  const { data } = await api.get(`/users-location/${id}?latitude=${latitude}&longitude=${longitude}${tags && `&tag=${tags}`}`)

  return data;
}

export default function useGetUsersLocation({ id, latitude, longitude, tags }: QueryLatLon) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getUsersLocation', id, latitude, longitude],
    queryFn: () => getUsersLocation({ id, latitude, longitude, tags }),
    refetchInterval: 10000
  })

  return { data, error, isLoading, refetch }
}