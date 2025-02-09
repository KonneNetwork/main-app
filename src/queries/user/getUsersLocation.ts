import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

interface QueryLatLon {
  id: string | undefined,
  latitude: number,
  longitude: number
}

async function getUsersLocation({ id, latitude, longitude }: QueryLatLon) {
  const { data } = await api.get(`/users-location/${id}?latitude=${latitude}&longitude=${longitude}`)

  return data;
}

export default function useGetUsersLocation({ id, latitude, longitude }: QueryLatLon) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getUsersLocation', id, latitude, longitude],
    queryFn: () => getUsersLocation({ id, latitude, longitude }),
    refetchInterval: 10000
  })

  return { data, error, isLoading, refetch }
}