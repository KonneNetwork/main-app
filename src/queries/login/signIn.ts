import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { User, userStore } from "@/store/userStore"; // Importando o Zustand
import { useRouter } from "expo-router"; // Importando o router

interface SingInRequest {
  email: string,
  passwd: string,
}

async function signIn(data: SingInRequest) {
  try {
    const resultado = await api.post('/session', {
      email: data.email,
      senha: data.passwd
    })
    console.log("🚀 ~ signIn ~ resultado:", resultado.data)
    return resultado.data;
  } catch (error) {
    throw error
  }
}

export function useSignIn() {
  const { setUserInfo, setToken, setProfile } = userStore();

  return useMutation({
    mutationKey: ['signIn'],
    mutationFn: (data: SingInRequest) => signIn(data),
    onSuccess: (data) => {
      console.log(data)
      const { nome_perfil, cd_perfil, foto_perfil, descricao, ocupacao, tema_perfil } = data.profileInfo
      const { nome_usuario, online, documento, email, cd_usuario, primeiro_acesso } = data.userInfo
      const formatUserInfo = {
        nomeUsuario: nome_usuario,
        online,
        documento,
        email,
        cdUsuario: cd_usuario,
        primeiroAcesso:primeiro_acesso
      }

      const formatProfileInfo = {
        nomePerfil: nome_perfil,
        descricao,
        ocupacao,
        temaPerfil: tema_perfil,
        cdPerfil: cd_perfil,
        fotoPerfil: foto_perfil,
      }
      console.log("🚀 ~ useSignIn ~ formatProfileInfo:", formatProfileInfo)
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
        Toast.show({
          type: 'error',
          text1: 'Mensagem de erro',
          text2: err.response?.data.error || 'Houve um erro tente novamente'
        })
      }
    }
  })
}
