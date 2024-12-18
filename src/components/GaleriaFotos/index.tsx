import { View, Image, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import Button from "../Button";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface GaleriaProps {
  onClose: () => void
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>
}

export default function GaleriaFotos({ onClose, image, setImage }: GaleriaProps) {
  const [imageGaleria, setImageGaleria] = useState<string | null>(null)

  async function SelectPicture() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,

    })

    if (!result.canceled) {
      setImageGaleria(result.assets[0].uri)
    }
  }

  function SafeImage() {
    setImage(imageGaleria);
    onClose();
  }

  return (
    <View className="flex-1 bg-black">


      {imageGaleria ? <View className="flex-1 justify-center p-8">
        <Image source={{ uri: imageGaleria }} className="w-full h-[60%]" />
        <Button title="Salvar" variant='active' onPress={SafeImage} />
      </View> : <View className="flex-1 justify-center p-8">
        <TouchableOpacity onPress={onClose} className="m-4 absolute top-0">
          <Ionicons name="arrow-back-outline" size={35} color="white" />
        </TouchableOpacity>
        <Text className="color-white text-3xl text-center font-roboto-700">Você ainda não selecionou nehuma foto</Text>
        <Button title="Selecione uma foto" variant='active' onPress={SelectPicture} />
      </View>}
    </View>
  )

}