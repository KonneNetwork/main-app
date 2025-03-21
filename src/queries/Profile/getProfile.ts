import { api } from "@/services/api";
import { Profile, userStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

async function getProfile(id: string, setProfile: (profile: Profile) => void) {

  const { data } = await api.get(`/perfil/${id}`)
  const { cd_perfil, foto_perfil, nome_perfil, descricao, ocupacao, tema_perfil } = data
  const formatProfileInfo = {
    nomePerfil: nome_perfil,
    descricao,
    ocupacao,
    temaPerfil: tema_perfil,
    cdPerfil: cd_perfil,
    fotoPerfil: foto_perfil,
  }

  setProfile(formatProfileInfo)
  return formatProfileInfo

}

export default function useGetProfile(id: string) {
  const { setProfile } = userStore();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getProfile', { id }],
    queryFn: () => getProfile(id, setProfile),
  });

  return { data, error, isLoading, refetch };
}