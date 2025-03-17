import { api } from "@/services/api";
import { userStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

interface LoginSocialRequest {
  email?: string | null,
  nome_usuario?: string,
  integracao: string,
  foto_usuario?: string,
  uuid?: string
}

async function loginSocial(data: LoginSocialRequest) {
  try {
    const resultado = await api.post('/login-social', data)
    console.log("🚀 ~ loginSocial ~ resultado.data:", resultado.data)
    return resultado.data
  } catch (error) {
    throw error
  }

}

export default function useLoginSocial() {
  const { setUserInfo, setToken, setProfile } = userStore();

  return useMutation({
    mutationKey: ['loginSocial'],
    mutationFn: (data: LoginSocialRequest) => loginSocial(data),
    onSuccess: (data) => {
      console.log("🚀 ~ useLoginSocial ~ data:", data)

      const { nome_perfil, cd_perfil, foto_perfil, descricao, ocupacao, tema_perfil } = data.profileInfo
      const { nome_usuario, online, documento, email, cd_usuario } = data.userInfo
      const formatUserInfo = {
        nomeUsuario: nome_usuario,
        online,
        documento,
        email,
        cdUsuario: cd_usuario
      }

      const formatProfileInfo = {
        nomePerfil: nome_perfil,
        descricao,
        ocupacao,
        temaPerfil: tema_perfil,
        cdPerfil: cd_perfil,
        fotoPerfil: foto_perfil,
      }

      setToken(data.token);
      setUserInfo(formatUserInfo)
      setProfile(formatProfileInfo)


      Toast.show({
        type: 'success',
        text1: 'Seja bem-vindo!'
      });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        console.log(err.response)
        Toast.show({
          type: 'error',
          text1: 'Mensagem de erro',
          text2: err.response?.data.error
        })
      }
    }
  })
}