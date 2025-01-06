import { api } from "@/services/api";
import { Profile, userStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useStore } from "zustand";

async function getProfile(id: string, setProfile:(profile: Profile) => void) {

  const { data } = await api.get(`/perfil/${id}`)
  const { cd_perfil, foto_perfil, nome, descricao, ocupacao, tema_perfil } = data
  const formatProfileInfo = {
    nome,
    descricao,
    ocupacao,
    temaPerfil: tema_perfil,
    cdPerfil: cd_perfil,
    fotoPerfil: foto_perfil,
  }

   setProfile(formatProfileInfo)
  return formatProfileInfo

}

// export default function useGetProfile(id: string) {
//   return useQuery({
//     queryKey: ['getProfile', { id }],
//     queryFn: () => getProfile(id),
//   })
// }

export default function useGetProfile(id: string) {
  // Obtém a função setProfile do Zustand
  const { setProfile } = userStore();

  // UseQuery para buscar o perfil
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getProfile', { id }],
    queryFn: () => getProfile(id, setProfile),
  });

  return { data, error, isLoading, refetch };
}