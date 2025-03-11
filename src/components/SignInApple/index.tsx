import * as AppleAuthentication from 'expo-apple-authentication';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Apple from '../../../assets/images/svgs/apple.svg';
import { useEffect, useState } from 'react';
import { AppleAuthenticationCredential } from 'expo-apple-authentication';
import ButtonSocialLogin from '../ButtonSocialLogin';
import Toast from 'react-native-toast-message';
import useLoginSocial from '@/queries/login/loginSocial';

interface Props {
  type: "default" | "mode"
}

export default function SignInApple({ type }: Props) {
  const { mutate: loginSocial, isPending, isError } = useLoginSocial()
  console.log("🚀 ~ SignInApple ~ isError:", isError)
  console.log("🚀 ~ SignInApple ~ isPending:", isPending)
  async function signIn() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })
      console.log("🚀 ~ signIn ~ credential:", credential)

      const transformData = {
        email: credential?.email,
        nome_usuario: credential.fullName?.givenName ||
          '' + credential.fullName?.familyName ||
          '',
        uuid: credential.user,
        integracao: 'apple'
      }

      loginSocial(transformData)

    } catch (error: any) {
      if (error.code === "ERR_REQUEST_CANCELED") {
        AppleAuthentication.signOutAsync({ user: "Carlos", state: "Canceled" })
        Toast.show({
          type: 'error',
          text1: "Operação cancelada!",
        })
      } else {
        Toast.show({
          type: 'error',
          text1: "Ocorreu um erro!",
          text2: "Tente novamente mais tarde."
        })
      }
    }
  }
  return (
    <View>
      <ButtonSocialLogin typeMode={type} action={signIn}>
        <Apple width={42} height={42} />
      </ButtonSocialLogin>
    </View>
  )
}
