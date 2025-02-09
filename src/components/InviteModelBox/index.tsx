import { LinearGradient } from "expo-linear-gradient"
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View, Text, ActivityIndicator, TextInput, FlatList } from "react-native"
import InputImage from "../InputImage"
import { Icons } from "../Icons"
import { Profile, userStore } from "@/store/userStore"
import { useEffect, useLayoutEffect, useState } from "react"
import React from "react"
import useGetOtherProfiles from "@/queries/Profile/getOtherProfiles"
import useCreateKonnexao from "@/queries/konnexoes/createKonnexao"
import { StatusKonnexao } from "@/app/(private)/buscar"
import { useGetMidiaLinks } from "@/queries/Profile/getMidiaLinks"
import CardMedia from "../CardMedia"

interface InviteModalProps {
  invite: boolean,
  setInvite: (value: React.SetStateAction<boolean>) => void
  userCode: string | null,
  statusKonnexao?: StatusKonnexao | null
}

export default function InviteModelBox({ invite, setInvite, userCode, statusKonnexao }: InviteModalProps) {
  console.log("🚀 ~ InviteModelBox ~ statusKonnexao:", statusKonnexao)

  const { userInfo: user } = userStore()
  const [infoUser, setInfoUser] = useState<Profile | null>()
  const { data, isLoading } = useGetOtherProfiles(userCode ?? "");
  const { mutate: createKonnexao } = useCreateKonnexao({ onClose })
  const { data: midiaLinks } = useGetMidiaLinks(infoUser?.cdPerfil ?? '')
  console.log("🚀 ~ InviteModelBox ~ midiaLinks:", midiaLinks)


  function onClose() {
    setInvite(false)
  }

  function createKonnection() {
    createKonnexao({
      cd_usuario: String(user?.cdUsuario),
      cd_convidado: String(infoUser?.cdUsuario)
    })
  }

  useLayoutEffect(() => {
    if (data) setInfoUser(data)
  }, [data])

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
              <InputImage image={infoUser?.fotoPerfil} isEdit={true} colorBorder='#B3CECF' colorIcon='#B3CECF' />
              <View className='flex-row gap-2 m-4'>
                {infoUser?.nomePerfil && <Text className='font-inter-600 text-2xl color-white'>{infoUser?.nomePerfil?.split(' ').map(word => word[0]).join('').toUpperCase()}</Text>}
                {infoUser?.ocupacao && <>
                  <View className='h-full bg-white w-[2px]' />
                  <Text className='font-inter-600 text-2xl color-white'>{infoUser?.ocupacao}</Text>
                </>}

              </View>

              {(statusKonnexao == "Konnectado" || statusKonnexao == null || statusKonnexao == "Konnectar") &&
                <View className='bg-black/20 p-5 rounded-3xl mt-8 w-full'>
                  <Text className='color-[#FFFFFF] font-inter-500'>Sobre {infoUser?.nomePerfil?.split(" ").slice(0, 1).join("")}</Text>
                  <TextInput
                    editable={false}
                    multiline
                    maxLength={164}
                    value={infoUser?.descricao}
                    className="color-[#FFFFFFAD] font-inter-400"
                  />

                </View>
              }
              {statusKonnexao == "Konnectado" && <>
                <View className="w-full my-4">
                  <Text className='font-inter-500 text-base color-white '>
                    Links {infoUser?.nomePerfil?.split(" ").slice(0, 1).join("")}
                  </Text>
                </View>

                <FlatList
                  className='w-full'
                  horizontal
                  contentContainerStyle={{
                    gap: 30,
                    justifyContent: 'space-between',
                  }}
                  scrollEnabled={false}
                  data={midiaLinks} renderItem={({ item }) => (
                    <CardMedia infoCard={item.cd_social_midia_fk} infoMidiaLink={item} isEditabled={true} style={{ backgroundColor: '#ffffff3f' }} className='rounded-lg px-5 py-3' />
                  )}


                /></>}



              {statusKonnexao === "Pendente" && <>
                <Text className='font-inter-500 text-2xl color-white text-center my-6'>Aguardando {infoUser?.nomePerfil} aceitar sua solicitação</Text>

                <TouchableOpacity className='flex-row  items-center gap-3 border-2 border-[#528A8C] p-8  justify-center w-full rounded-md '
                  onPress={onClose}
                >
                  <Text className='font-inter-500 text-xl color-white mt-2'>Voltar</Text>

                </TouchableOpacity>
              </>}

            </View>

            {(statusKonnexao === null || statusKonnexao == "Konnectar") && <View className='items-center gap-2'>
              <Text className='font-inter-500 text-base color-white'>
                Konnecte-se para entrar em contato
              </Text>

              <TouchableOpacity className='flex-row  items-center gap-3 bg-surface-brand-main-default p-5  justify-center w-full rounded-md '
                onPress={createKonnection}
              >
                <Icons.heart color={"#fcf9f967"} />
                <View className='flex-row gap-2'>
                  <Text className='font-inter-500 text-xl color-white'>Solicitar</Text>
                  <Text className='font-inter-700 text-xl color-white'>Konnexão</Text>
                </View>
              </TouchableOpacity>
            </View>}

          </LinearGradient>
        </View>
      </View>

    </Modal >}
  </>

  )
}