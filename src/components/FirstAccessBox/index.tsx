import { Modal, View, Text, TouchableOpacity } from "react-native";
import Button from "../Button";

interface Props {
    open : boolean
}

export default function FirstAccessBox({open}:Props){
    return(

        <Modal visible={open} transparent={true} presentationStyle='overFullScreen' animationType='fade' style={{ backgroundColor: '#000', flex: 1 }} >
            <View style={{ flex: 1, backgroundColor: "#0000002f", justifyContent:'center', alignItems:'center'}} >
                <View className="w-[75%] h-[55%] bg-white rounded-3xl">
                    <Text>Bem-Vindo a Konne!</Text>

                    <Text>Este é seu primeiro acesso, gostariamos de dar as boas-vindas!</Text>
                    <Text>Para saber um pouco melhor sobre você, vamos te levar para tela de preferências, onde você vai selecionar algumas opções para otimizarmos
                        o seu perfil.
                    </Text>
                    <TouchableOpacity className="bg-surface-brand-main-default w-[60%]">
                        <Text className="color-white font-Inter-700">Ir!</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </Modal>
       
    )
}