import { Text, View, Image, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Modal } from "react-native";
import logo from "../../../assets/images/logo.png";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Linkedin from '../../../assets/images/svgs/linkedin.svg';
import { useEffect, useState } from "react";
import classNames from "classnames";
import SignUp from "./sign-up";
import { StatusBar } from "expo-status-bar";
import { z } from "zod";
import { useSignIn } from "@/queries/login/signIn";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import ForgotPassword from "@/components/ForgotPassword";
import { useTranslation } from "react-i18next";
import "@/services/i18n";
import * as Localization from "expo-localization";
import SignInApple from "@/components/SignInApple";
import useSignInLinkedin from "@/hooks/useSignInLinkedin";
import ButtonSocialLogin from "@/components/ButtonSocialLogin";

const schema = z.object({
  email: z.string().email("email inválido!"),
  passwd: z.string().min(6, "minimo 6 caracteres.")
})

type SignInSchema = z.infer<typeof schema>

export default function SignIn() {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'SignIn' })
  const [signUp, setSignUp] = useState(false);
  const [forgotPasswd, setForgotPasswd] = useState(false)
  const { mutate: signIn, isPending } = useSignIn();
  const { promptAsync, request, response } = useSignInLinkedin();
  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value).then(() => console.log("linguagem Alterada")).catch((err) => console.log(err))
  }
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      passwd: "",
    },
    resolver: zodResolver(schema)
  });

  function handleLogin({ email, passwd }: SignInSchema) {
    signIn({ email, passwd });
  }

  useEffect(() => {
    Localization
    // changeLanguage(String(Localization.getLocales().map(item => item.languageTag)))
  }, [])

  return (
    <View className="flex-1">
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView className="bg-surface-brand-main-selected" contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }} showsVerticalScrollIndicator={false} bounces={false}>
          <StatusBar style="light" translucent />
          <View className={classNames("p-5 justify-between", { 'flex-1': !signUp })}>
            <Image source={logo} className="mt-8" />
            {/* <Button title="Inglês" variant="active" onPress={() => changeLanguage('en')} ></Button>
            <Button title="Português" variant="active" onPress={() => changeLanguage('pt')} ></Button> */}
            {!signUp && <>
              <Text className="font-inter-700 text-3xl leading-9 color-white my-5">{t('greeting')}</Text>
              <Text className="text-lg font-inter-400 leading-5 mb-8 color-white">
                {t('message login')}
              </Text>

              <View>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <Input label="E-mail" variant="white" value={value} onChangeText={onChange} onBlur={onBlur} errorShowInSide={errors.email} />
                  )}
                />

                <Controller
                  name="passwd"
                  control={control}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <Input label={t('passwd')} password={true} variant="white" value={value} onChangeText={onChange} onBlur={onBlur} errorShowInSide={errors.passwd} />
                  )}
                />
                <TouchableOpacity onPress={() => { setForgotPasswd(true) }}>
                  <Text className="text-base color-white text-right underline">{t('forget passwd')}</Text>
                </TouchableOpacity>
              </View>

              <Button loading={isPending} variant="active" title={t('sign in')} onPress={handleSubmit(handleLogin)} />

              <View style={styles.container}>
                <View style={styles.line} />
                <Text style={styles.text}>{t('or midias')}</Text>
                <View style={styles.line} />
              </View>

              <View className=" flex-row justify-center items-center self-center gap-5">

                <ButtonSocialLogin typeMode='default' action={() => { console.log('teste'), promptAsync() }}>
                  <Linkedin width={44} height={44} />
                </ButtonSocialLogin>

                {Platform.OS === "ios" && <SignInApple type='default' />}
              </View>
            </>}
          </View>
          <SignUp signUp={signUp} setSignUp={setSignUp} />
          <Modal visible={forgotPasswd} transparent={true} presentationStyle='overFullScreen' animationType='fade' style={{ backgroundColor: '#000', flex: 1 }} >
            <View style={{ flex: 1, backgroundColor: "#0000008f" }}>
              <ForgotPassword forgotPasswd={forgotPasswd} setForgotPasswd={setForgotPasswd} />
            </View>
          </Modal>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ffffff',
  },
  text: {
    marginHorizontal: 10,
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '400',
  },
});
