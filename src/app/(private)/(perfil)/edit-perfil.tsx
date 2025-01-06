import Button from '@/components/Button'
import InputImage from '@/components/InputImage'
import InputPerfil from '@/components/InputPerfil'
import { palleteColors } from '@/constants/paletteColor'
import React, { useEffect, useState } from 'react'
import { FlatList, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator';
import Camera from '@/components/Camera'
import GaleriaFotos from '@/components/GaleriaFotos'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { userStore } from '@/store/userStore'
import { useUpdateProfile } from '@/queries/Profile/updateProfile'
import useGetProfile from '@/queries/Profile/getProfile'


const schema = z.object({
  image: z.string(),
  name: z.string(),
  occupation: z.string(),
  description: z.string(),
  themeColor: z.string(),
})

type UpdateProfileSchema = z.infer<typeof schema>

interface EditPerfilProps {
  onClosed: () => void
}

export default function EditPerfil({ onClosed }: EditPerfilProps) {
  const [selectedId, setSelectedId] = useState<{ id: number, color: string } | null>(null);
  const [optionsImage, setOptionsImage] = useState(false);
  const [camera, setCamera] = useState(false)
  const { userInfo, profile } = userStore()
  const [galeria, setGaleria] = useState(false)
  const { data } = useGetProfile(profile?.cdPerfil ?? "")
  const { mutate: updateProfile } = useUpdateProfile(profile?.cdPerfil ?? "", onClosed);
  const [image, setImage] = useState<string | null>('')
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      image: profile?.fotoPerfil || "",
      name: profile?.nomePerfil || "",
      occupation: profile?.ocupacao || "",
      description: profile?.descricao || "",
      themeColor: profile?.temaPerfil || "",
    },
    resolver: zodResolver(schema)
  })

  const handleSelectItem = (id: number, color: string) => {
    setSelectedId({ id, color })
  }

  function openOptionsImage() {
    setOptionsImage(true)
  }
  function closeOptionsImage() {
    setOptionsImage(false)
  }
  function openCamera() {
    setCamera(true)
  }
  function closeCamera() {
    setCamera(false)
  }

  function openGaleria() {
    setGaleria(true)
  }
  function closeGaleria() {
    setGaleria(false)
  }

  async function CompressImage(image: string) {
    const resultCompress = await manipulateAsync(image, [], {
      compress: 0.4,
      format: SaveFormat.JPEG,
    })
    return resultCompress
  }

  async function onSubmit(data: UpdateProfileSchema) {
    console.log("🚀 ~ onSubmit ~ data:", data)


    const imageCompress = await CompressImage(data.image)
    console.log("🚀 ~ onSubmit ~ imageCompress:", imageCompress)

    updateProfile({
      image: data.image !== "" ? imageCompress.uri : "",
      description: data.description,
      name: data.name,
      occupation: data.occupation,
      themeColor: data.themeColor
    })

  }


  useEffect(() => {
    setValue('image', image ? image : profile?.fotoPerfil ?? '')
    setValue('themeColor', selectedId?.color ?? '')
  }, [selectedId, image])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }} showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps="handled">

        <View className='  w-full items-center gap-2 bg-surface-primary pt-8 px-8 pb-4 rounded-t-[30px]'>
          <Controller
            name='image'
            control={control}
            render={({ field }) => (
              <InputImage image={field.value ?? profile?.fotoPerfil} onOpen={openOptionsImage} isEdit={true} {...field} />
            )} />

          <Controller name='name'
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputPerfil
                value={value}
                isEditable={true}
                label='Nome'
                placeholder='Seu Nome'
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )} />


          <Controller name='occupation'
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputPerfil
                isEditable={true}
                label='Profissão'
                placeholder='Sua Profissão'
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )} />

          <Controller name='description'
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputPerfil
                value={value}
                showEditIcon={false}
                isEditable={true}
                label='Sobre Você'
                placeholder='Escreva um texto de apresentação...'
                multiline
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )} />

          <Text className='self-start font-roboto-500 text-sm'>Escolher Tema</Text>

          <Controller name='themeColor'
            control={control}
            render={({ field }) => (
              <FlatList
                style={{ width: '100%' }}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                data={palleteColors}
                horizontal
                renderItem={
                  ({ item }) => {
                    return (
                      <Pressable
                        key={item.id}
                        onPress={() => handleSelectItem(item.id, item.color)}
                        style={{
                          height: 80,
                          width: 80,
                          backgroundColor: item.color,
                          borderRadius: 100,
                          marginHorizontal: 5,
                          borderWidth: selectedId?.id === item.id ? 6 : 0,
                          borderColor: selectedId?.id === item.id ? '#17D7B5' : 'transparent'
                        }}
                        {...field}
                      />
                    )
                  }}
              />
            )} />


          <View className='flex-row gap-3 w-full'>
            <Button
              variant='inactive'
              title=' Cancelar'
              mediumButton={true}
              onPress={onClosed}
            />
            <Button
              variant='active'
              title=' Salvar'
              mediumButton={true}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
        <Modal visible={optionsImage} presentationStyle='overFullScreen' animationType='fade' transparent={true} style={{ backgroundColor: '#000', flex: 1 }} >
          <View className='flex-1 bg-[#000000af] justify-end items-center gap-3 py-8'>

            <View className='w-full items-center'>
              <TouchableOpacity
                className='bg-white p-3 rounded-t-lg w-[90%] justify-center items-center'
                onPress={() => { closeOptionsImage(); openGaleria() }}
              >
                <Text
                  className='font-roboto-400 color-[#007AFF] text-2xl '
                >Caleria de Fotos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { closeOptionsImage(); openCamera() }}
                className='bg-white p-3 rounded-b-lg w-[90%] justify-center items-center'
              >
                <Text
                  className='font-roboto-400 color-[#007AFF] text-2xl'
                >Câmera
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setOptionsImage(false)} className='bg-white p-3 rounded-lg w-[90%] justify-center items-center' ><Text className='font-roboto-700 color-[#007AFF] text-2xl '>Cancelar</Text></TouchableOpacity>


          </View>
        </Modal>
        <Modal visible={camera} presentationStyle='fullScreen' animationType='fade' style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: "#0000002f" }}>
            <Camera onClose={closeCamera} setImage={setImage} image={image} />
          </View>
        </Modal>
        <Modal visible={galeria} presentationStyle='fullScreen' animationType='fade' style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: "#0000002f" }}>
            <GaleriaFotos onClose={closeGaleria} setImage={setImage} image={image} />
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
