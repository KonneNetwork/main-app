import { LinearGradient } from "expo-linear-gradient"
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View, Text } from "react-native"
import InputImage from "../InputImage"
import { Icons } from "../Icons"
import { Profile, User } from "@/store/userStore"
import { useEffect, useLayoutEffect, useState } from "react"
import { useGetMidiaLinks } from "@/queries/Profile/getMidiaLinks"
import useGetProfile from "@/queries/Profile/getProfile"
import React from "react"

interface InviteModalProps {
  invite: boolean,
  setInvite: (value: React.SetStateAction<boolean>) => void
  userCode: string | null,
}

export default function InviteModelBox({ invite, setInvite, userCode }: InviteModalProps) {
  console.log("🚀 ~ InviteModelBox ~ userCode:", userCode)
  const [infoUser, setInfoUser] = useState<Profile | null>()
  const { data } = useGetProfile(userCode ?? "");
  console.log("🚀 ~ InviteModelBox ~ userProfile:", data)


  useLayoutEffect(() => { setInfoUser(data) }, [userCode])

  return (<>
    {data && <Modal
      visible={invite}
      transparent={true}
      presentationStyle='overFullScreen'
      animationType='fade'
      style={{ backgroundColor: '#000', flex: 1 }} >

      <View style={{ flex: 1 }}>

        <TouchableWithoutFeedback onPress={() => setInvite(false)}><View className='w-full h-full' /></TouchableWithoutFeedback>

        <View className='w-full h-[80%] z-10 absolute bottom-0'>
          <LinearGradient locations={[0, 0.2, 0.8, 1]}
            colors={['#00000000', '#4f8f90', '#005c61', '#006560']}
            style={{ flex: 1, width: '100%', justifyContent: 'center', alignContent: 'center', gap: 40, padding: 30 }}  >

            <View className='justify-center items-center'>
              <InputImage image={infoUser?.fotoPerfil} isEdit={true} color='#B3CECF' />
              <View className='flex-row gap-2 m-4'>
                {infoUser?.nomePerfil && <Text className='font-inter-600 text-2xl color-white'>{infoUser?.nomePerfil?.split(' ').map(word => word[0]).join('').toUpperCase()}</Text>}
                {infoUser?.ocupacao && <>
                  <View className='h-full bg-white w-[2px]' />
                  <Text className='font-inter-600 text-2xl color-white'>{infoUser?.ocupacao}</Text>
                </>}

              </View>
            </View>

            <View className='items-center gap-2'>
              <Text className='font-inter-500 text-base color-white'>
                Konnecte-se para entrar em contato
              </Text>

              <TouchableOpacity className='flex-row  items-center gap-3 bg-surface-brand-main-default p-5  justify-center w-full rounded-md '
                onPress={() => { }}
              >
                <Icons.heart color={"#fcf9f967"} />
                <View className='flex-row gap-2'>
                  <Text className='font-inter-500 text-xl color-white'>Solicitar</Text>
                  <Text className='font-inter-700 text-xl color-white'>Konnexão</Text>
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>

    </Modal >}
  </>

  )
}