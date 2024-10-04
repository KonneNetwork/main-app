import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import logo from "../../../assets/images/logo.png"
import Input from "@/components/Input";
import Button from "@/components/Button";
import Feather from '@expo/vector-icons/Feather';
import Linkeding from '../../../assets/images/linkeding.svg'

export default function Index() {
  return (

    <View
      className="bg-background flex-1"
    >
      <View className="p-5">
        <Image
          source={logo}
          className="my-8"
        />
        <Text
          className="font-bold text-3xl leading-9 color-white mb-5">
          Boas Vindas
        </Text>
        <Text
          className="text-lg font-normal leading-5 mb-8 color-white"
        >
          Faça login e comece a se conectar com pessoas próximas a você.
        </Text>
        <Input label="E-mail" password={false} />
        <Input label="Senha" password={true} />
        <Text className="text-base color-white text-right underline">Esqueci minha senha</Text>

        <Button title="Entrar" />


        <View className="flex-row items-center self-center my-5 " style={{ gap: 20 }}>
          <Text className="text-base font-medium color-white">Continuar sem login</Text>
          <View className="bg-[#ffffff2b] p-3 rounded-lg">
            <Feather name="arrow-right" size={24} color="white" />
          </View>

        </View>


        <View style={styles.container}>
          <View style={styles.line} />
          <Text style={styles.text}>Ou entre com</Text>
          <View style={styles.line} />
        </View>

        <View
          className="bg-[#ffffff2b] rounded-lg items-center p-3 w-20 self-center mt-5 border-2 border-white"
        >
          <Linkeding width={42} height={42} />
        </View>

      </View>

      <View className="bg-white flex-1 rounded-t-[30px] py-10 px-8">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-base font-medium color-[#528A8C]">Novo por aqui?</Text>
            <Text className='text-3xl font-bold'>Criar conta</Text>
          </View>
          <View
            className="bg-[#528A8C2b] rounded-3xl items-center p-5 w-20 self-center border-2 border-white"
          >
            <Feather name="arrow-up-right" size={32} color="#528A8C" />
          </View>
        </View>
      </View>
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