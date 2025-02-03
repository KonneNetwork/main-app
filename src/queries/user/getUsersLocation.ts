import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

interface QueryLatLon {
  latitude: number,
  longitude: number
}

async function getUsersLocation({ latitude, longitude }: QueryLatLon) {
  const { data } = await api.get(`/users-location?latitude=${latitude}&longitude=${longitude}`)

  return data;
}

export default function useGetUsersLocation({ latitude, longitude }: QueryLatLon) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getUsersLocation'],
    queryFn: () => getUsersLocation({ latitude, longitude }),
    refetchInterval: 10000,
  })

  return { data, error, isLoading, refetch }
}