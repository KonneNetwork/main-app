import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

async function getOtherProfiles(id: string) {

  const { data } = await api.get(`/perfil/${id}`)
  const { cd_perfil, foto_perfil, nome_perfil, descricao, ocupacao, tema_perfil, cd_usuario } = data
  const formatProfileInfo = {
    nomePerfil: nome_perfil,
    descricao,
    ocupacao,
    temaPerfil: tema_perfil,
    cdPerfil: cd_perfil,
    fotoPerfil: foto_perfil,
    cdUsuario: cd_usuario
  }

  return formatProfileInfo

}

export default function useGetOtherProfiles(id: string) {

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getOtherProfile', { id }],
    queryFn: () => getOtherProfiles(id),
  });

  return { data, error, isLoading, refetch };
}