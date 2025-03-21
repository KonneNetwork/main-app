import { CameraView, CameraType, useCameraPermissions, FlashMode, CameraCapturedPicture } from "expo-camera"
import { useRef, useState } from "react"
import { View, Text, TouchableOpacity, Image } from "react-native";
import Button from "../Button";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import React from "react";


interface CameraProps {
  onClose: () => void
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>
}

export default function Camera({ onClose, setImage, image }: CameraProps) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<FlashMode>('off');
  const cameraRef = useRef<CameraView>(null);
  const [ImageCamera, setImageCamera] = useState('')

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (

      <View className="flex-1 justify-center p-8 bg-black">
        <TouchableOpacity onPress={onClose} className="m-4 absolute top-0">
          <Ionicons name="arrow-back-outline" size={35} color="white" />
        </TouchableOpacity>
        <Text className="color-white text-3xl text-center font-roboto-700">Nós precisamos da sua permissão para habilitar a câmera.</Text>
        <Button onPress={requestPermission} title="Permitir" variant='active' />
      </View>
    )
  }

  function toggleCameraFacing() {
    setFacing(current => (current === "back" ? "front" : "back"))
  }

  function toggleCameraFlash() {
    setFlash(current => (current === "off" ? "on" : "off"))
  }
  async function Takepicture() {
    try {
      const data = await cameraRef?.current?.takePictureAsync();
      if (data?.uri) { setImageCamera(data?.uri) }
    } catch (error) {
      throw error
    }

  }

  function SafeImage() {
    setImage(ImageCamera);
    onClose();
  }

  return (
    <View className="flex-1 bg-black">
      <TouchableOpacity onPress={onClose} className="m-4">
        <Ionicons name="arrow-back-outline" size={35} color="white" />
      </TouchableOpacity>
      {!ImageCamera ? <View className="rounded-3xl flex-1 overflow-hidden w-[90%] items-center justify-center self-center">
        <CameraView style={{ flex: 1, width: "100%" }} facing={facing} flash={flash} ref={cameraRef} />
      </View> : <View className="rounded-3xl flex-1 overflow-hidden w-[90%] items-center justify-center self-center">
        <Image source={{ uri: ImageCamera }} className="flex-1 self-center w-full" />
      </View>}


      <View className="flex-row justify-around items-center py-8">
        {!ImageCamera ?
          <>
            <TouchableOpacity onPress={toggleCameraFacing}>
              <MaterialIcons name="flip-camera-android" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={Takepicture}>
              <Ionicons name="radio-button-on" size={60} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraFlash}>
              <MaterialCommunityIcons name="flash" size={30} color={facing === "back" && flash === "on" ? "white" : "grey"} />
            </TouchableOpacity>
          </> : <>
            <TouchableOpacity onPress={() => { setImageCamera('') }}>
              <Text className="color-white">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={SafeImage}>
              <Text className="color-white">Salvar</Text>
            </TouchableOpacity>
          </>}
      </View>


    </View>
  )

}