import { Text, View, Image, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import logo from "../../assets/images/logo.png";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Feather from '@expo/vector-icons/Feather';
import Linkeding from '../../assets/images/svgs/linkeding.svg';
import { useState } from "react";
import classNames from "classnames";
import { useRouter } from "expo-router";
import SignUp from "./sign-up";
import { StatusBar } from "expo-status-bar";

export default function SignIn() {
  const [signUp, setSignUp] = useState(false);
  const router = useRouter();



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
                <Input
                  label="E-mail"
                  variant="white" />
                <Input
                  label="Senha"
                  password={true}
                  variant="white" />

                <Text
                  className="text-base color-white text-right underline"
                >
                  Esqueci minha senha
                </Text>
              </View>

              <Button
                variant='active'
                title="Entrar"
                onPress={() => router.push('/(tabs)')}
              />
              {/* 
              <View className="flex-row items-center self-center my-5 " style={{ gap: 20 }} >
                <Text className="text-base font-medium color-white">Continuar sem login</Text>
                <TouchableOpacity className="bg-[#ffffff2b] p-3 rounded-lg" onPress={() => router.push('/(tabs)')}>
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