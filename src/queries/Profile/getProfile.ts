import { api } from "@/services/api";
import { Profile } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useStore } from "zustand";

async function getProfile(id: string) {

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

  return formatProfileInfo

}

export default function useGetProfile(id: string) {
  return useQuery({
    queryKey: ['getProfile', { id }],
    queryFn: () => getProfile(id),
  })
}