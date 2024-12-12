import { Text, View, Image, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import logo from "../../../assets/images/logo.png";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Linkeding from '../../../assets/images/svgs/linkeding.svg';
import { useState } from "react";
import classNames from "classnames";
import SignUp from "./sign-up";
import { StatusBar } from "expo-status-bar";
import { userStore } from "@/store/userStore";
import { z } from "zod";
import { useSignIn } from "@/queries/login/signIn";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("email inválido!"),
  passwd: z.string().min(6, "minimo 6 caracteres.")
})

type SignInSchema = z.infer<typeof schema>



export default function SignIn() {
  const [signUp, setSignUp] = useState(false);
  const { login } = userStore();
  const { mutate: signIn, isPending } = useSignIn();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      passwd: "",
    },
    resolver: zodResolver(schema)
  })



  function handleLogin({ email, passwd }: SignInSchema) {

    const resultado = signIn({ email, passwd })
    console.log("🚀 ~ handleLogin ~ resultado:", resultado)

    // login("fb@email.com", "123")
  }



  return (
    <View
      className="flex-1"
    >
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          className="bg-surface-brand-main-selected"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <StatusBar
            style='light'
            translucent
          />

          <View className={classNames("p-5 justify-between", {
            'flex-1': !signUp
          })}>
            <Image
              source={logo}
              className="mt-8"
            />
            {!signUp && <>
              <Text
                className="font-inter-700 text-3xl leading-9 color-white my-5">
                Boas Vindas
              </Text>
              <Text
                className="text-lg font-inter-400 leading-5 mb-8 color-white"
              >
                Faça login e comece a se conectar com pessoas próximas a você.
              </Text>

              <View>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <Input
                      label="E-mail"
                      variant="white"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.email}
                    />
                  )} />

                <Controller
                  name="passwd"
                  control={control}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <Input
                      label="Senha"
                      password={true}
                      variant="white"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.passwd}
                    />
                  )} />

                <Text
                  className="text-base color-white text-right underline"
                >
                  Esqueci minha senha
                </Text>
              </View>

              <Button
                loading={isPending}
                variant='active'
                title="Entrar"
                onPress={handleSubmit(handleLogin)}
              />
              {/* 
              <View className="flex-row items-center self-center my-5 " style={{ gap: 20 }} >
                <Text className="text-base font-medium color-white">Continuar sem login</Text>
                <TouchableOpacity className="bg-[#ffffff2b] p-3 rounded-lg" onPress={() => router.push('/(private)')}>
                  <Feather name="arrow-right" size={24} color="white" />
                </TouchableOpacity>

              </View> */}


              <View style={styles.container}>
                <View
                  style={styles.line} />
                <Text
                  style={styles.text}>
                  Ou entre com
                </Text>
                <View
                  style={styles.line} />
              </View>

              <View
                className="bg-[#ffffff2b] rounded-lg items-center px-3 py-2 w-20 self-center mt-5 mb-3 border-2 border-[#EEEEEE]"
              >
                <Linkeding
                  width={42}
                  height={42}
                />
              </View>
            </>}


          </View>
          <SignUp signUp={signUp} setSignUp={setSignUp} />
        </ScrollView >
      </KeyboardAvoidingView>
    </View >
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