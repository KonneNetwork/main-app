import { Text, View, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import logo from "../../assets/images/logo.png"
import Input from "@/components/Input";
import Button from "@/components/Button";
import Feather from '@expo/vector-icons/Feather';
import Linkeding from '../../assets/images/linkeding.svg'
import { StatusBar } from "react-native";
import { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import classNames from "classnames";

export default function Index() {
  const [signUp, setSignUp] = useState(false);

  function handleSignUp() {
    setSignUp(!signUp)
  }

  return (
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
        className="bg-background"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <StatusBar barStyle='light-content' />

        <View className={classNames("p-5 justify-between", {
          'flex-1': !signUp
        })}>
          <Image
            source={logo}
            className="mt-8"
          />
          {!signUp && <>
            <Text
              className="font-bold text-3xl leading-9 color-white my-5">
              Boas Vindas
            </Text>
            <Text
              className="text-lg font-normal leading-5 mb-8 color-white"
            >
              Faça login e comece a se conectar com pessoas próximas a você.
            </Text>

            <Input label="E-mail" />
            <Input label="Senha" password={true} />
            <Text className="text-base color-white text-right underline">Esqueci minha senha</Text>

            <Button title="Entrar" />


            <View className="flex-row items-center self-center my-5 " style={{ gap: 20 }}>
              <Text className="text-base font-medium color-white">Continuar sem login</Text>
              <TouchableOpacity className="bg-[#ffffff2b] p-3 rounded-lg">
                <Feather name="arrow-right" size={24} color="white" />
              </TouchableOpacity>

            </View>


            <View style={styles.container}>
              <View style={styles.line} />
              <Text style={styles.text}>Ou entre com</Text>
              <View style={styles.line} />
            </View>

            <View
              className="bg-[#ffffff2b] rounded-lg items-center p-3 w-20 self-center mt-5 mb-3 border-2 border-white"
            >
              <Linkeding width={42} height={42} />
            </View></>}


        </View>

        <View className={classNames("bg-white  rounded-t-[30px] py-10 px-8",
          {
            'flex-grow': signUp
          }
        )}>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-base font-medium color-[#528A8C]">Novo por aqui?</Text>
              <Text className='text-3xl font-bold'>Criar conta</Text>
            </View >
            <TouchableOpacity
              className="bg-[#528A8C2b] rounded-3xl items-center p-5 w-20 self-center border-2 border-white"
              onPress={handleSignUp}
            >
              {signUp ? <AntDesign name="close" size={32} color="#528A8C" /> : <Feather name="arrow-up-right" size={32} color="#528A8C" />}
            </TouchableOpacity>
          </View >
        </View >

      </ScrollView>
    </View>
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
    backgroundColor: '#ffffff', // Cor da linha
  },
  text: {
    marginHorizontal: 10,
    color: '#ffffff', // Cor do texto
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '400',
  },
});