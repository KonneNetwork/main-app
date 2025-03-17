import { Modal, View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import Button from "../Button";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { userStore } from "@/store/userStore";
import { useUpdateProfile } from "@/queries/Profile/updateProfile";
import { useUpdateFirstAccess } from "@/queries/Profile/updateFirstAccess";

interface Props {
    open: boolean
    setBox: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FirstAccessBox({ open = false, setBox }: Props) {

    const { height } = useWindowDimensions()
    const [valueHeight, setValueHeight] = useState(height)
    const { userInfo } = userStore()
    console.log("🚀 ~ FirstAccessBox ~ userInfo:", userInfo?.cdUsuario)
    const { mutate: updateFirstAccess } = useUpdateFirstAccess(userInfo?.cdUsuario ?? "", onClosed);

    function onClosed() {
        setBox(false)
    }

    function onSubmit() {
        updateFirstAccess({
            primeiroAcesso: false,
        })
    }


    return (

        <Modal visible={open} transparent={true} presentationStyle='overFullScreen' animationType='fade' style={{ backgroundColor: '#000', flex: 1 }} >
            <View style={{ flex: 1, backgroundColor: "#0000002f", justifyContent: 'center', alignItems: 'center' }} >
                <View className="w-[75%] h-[55%] bg-white rounded-3xl p-6 justify-between" style={{ height: valueHeight > 850 ? '55%' : '75%' }}>

                    <Text className=" text-center font-inter-700 text-3xl">Bem-Vindo a Konne!</Text>

                    <View className="gap-5">
                        <Text className="text-justify text-xl">Este é seu primeiro acesso, gostariamos de dar as boas-vindas!</Text>
                        <Text className="text-justify text-xl">Para saber um pouco melhor sobre você, vamos te levar para tela de preferências, onde você vai selecionar algumas opções para otimizarmos
                            o seu perfil.
                        </Text>
                    </View>
                    <TouchableOpacity className="bg-surface-brand-main-default w-[60%] p-2 rounded-lg self-center" onPress={() => {
                        router.navigate('/(menu)');
                        router.navigate('/preference');
                        setBox(false);
                        onSubmit()
                    }}>
                        <Text className="color-white font-Inter-700 text-center text-2xl">Ir!</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </Modal>

    )
}