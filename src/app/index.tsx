import { Text, View, Image, StyleSheet, TextInput } from "react-native";
import logo from "../../assets/images/logo.png"
import Input from "@/components/Input";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Image source={logo} style={styles.image} />
      <Text style={styles.textWelcome}>Boas Vindas</Text>
      <Text style={styles.textdescription}>Faça login e comece a se conectar com pessoas próximas a você.</Text>
      <Input label="E-mail" />

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2D4CE0',
    padding: 20
  },
  image: {
    marginVertical: 30
  },
  textWelcome: {
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 36,
    color: '#ffffff',
    marginBottom: 20
  },
  textdescription: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 22,
    color: '#ffffff',
    marginBottom: 30
  }
})