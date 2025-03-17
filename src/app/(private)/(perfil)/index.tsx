import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, View, FlatList } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import InputPerfil from '@/components/InputPerfil';
import HeaderUser from '@/components/HeaderUser';
import EditPerfil from './edit-perfil';
import AddLink from './add-link';
import CardMedia from '@/components/CardMedia';
import EditLink from './edit-link';
import { userStore } from '@/store/userStore';
import useGetProfile from '@/queries/Profile/getProfile';
import { useGetMidiaLinks } from '@/queries/Profile/getMidiaLinks';

function Perfil() {
  const [openPerfil, setOpenPerfil] = useState(false);
  const [openAddLinks, setOpenAddLinks] = useState(false);
  const [openEditLinks, setOpenEditLinks] = useState(false);
  const { userInfo, profile, socialMidiaLinks } = userStore();
  const { data: midiaLinks } = useGetMidiaLinks(profile?.cdPerfil ?? '')
  const { data: userProfile } = useGetProfile(userInfo?.cdUsuario ?? '');

  const [addLink, setAddLink] = useState<any | { label: string, link: string, category: string }[] | undefined | null>(socialMidiaLinks?.sort((linkA, linkB) => linkB.data_criacao - linkA?.data_criacao));
  const [editLink, setEditLink] = useState<any | { label: string, link: string, category: string } | null>(socialMidiaLinks);
  function handleCloseModalPerfil() {
    setOpenPerfil(false)
  }

  function handleOpenModalPerfil() {
    setOpenPerfil(true)
  }

  function handleCloseModalLinks() {
    setOpenAddLinks(false)
  }

  function handleOpenModalLinks() {
    setOpenAddLinks(true)
  }

  function handleCloseModalEditLinks() {
    setOpenEditLinks(false)
  }

  function hadleOpenModalEditLinks(link: { label: string, link: string, category: string } | null) {
    setEditLink(link)
    setOpenEditLinks(true)
  }

  function midiasInfo() {
    userProfile;
    midiaLinks;
  }


  useEffect(() => {
    midiasInfo();
  }, [])


  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (data) {
  //       await refetch(); // Força o refetch após o dado ser alterado
  //     }
  //   };
  //   fetchData();
  // }, [data, refetch]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     refetch(); // Força o refetch dos dados sempre que a tela for focada
  //   }, [refetch]) // O refetch será executado toda vez que a tela ganhar o foco
  // );

  // useEffect(() => {
  //   console.log(userInfo)

  //   return setAddLink(userInfo?.links);

  // }, [])



  return (
    <View className='flex-1'>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          className='bg-surface-primary flex-1'
          data={midiaLinks}
          ListHeaderComponentStyle={{ alignItems: 'center' }}
          ListHeaderComponent={
            <>
              <Text className='font-roboto-700  mt-8  text-3xl '>Meu Perfil</Text>

              <HeaderUser color={profile?.temaPerfil} image={profile?.fotoPerfil ?? userInfo?.fotoUsuario ?? ''} occupation={profile?.ocupacao} userName={profile?.nomePerfil ? profile?.nomePerfil : userInfo?.nomeUsuario} onOpen={handleOpenModalPerfil} />

              <InputPerfil
                isEditable={false}
                multiline={true}
                label='Sobre você'
                placeholder='Escreva um texto de apresentação ...'
                onOpen={handleOpenModalPerfil}
                value={profile?.descricao}

              />


              <View className='w-full gap-5 mt-6'>
                <Text>Meus links</Text>
              </View>

            </>
          }
          ListFooterComponentStyle={{ marginVertical: 30 }}
          ListFooterComponent={
            <>
              <TouchableOpacity
                className='flex-row bg-[#F4F4F4] w-full justify-center items-center p-4 gap-3 rounded-lg'
                onPress={handleOpenModalLinks}
              >
                <Feather name="plus" size={24} color="black" />
                <Text className='font-roboto-500 text-base'>
                  Adicionar link
                </Text>
              </TouchableOpacity>
            </>
          }
          contentContainerStyle={{
            justifyContent: 'space-between',
            padding: 30,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.cd_social_midia_link}
          renderItem={({ item }) => (
            <CardMedia infoCard={item.cd_social_midia_fk} infoMidiaLink={item} isEditabled={false} openModal={hadleOpenModalEditLinks} />
          )}
          numColumns={3}
        />
        <Modal visible={openPerfil} transparent={true} presentationStyle='overFullScreen' animationType='fade' style={{ backgroundColor: '#000', flex: 1 }} >
          <View style={{ flex: 1, backgroundColor: "#0000002f" }}>
            <EditPerfil onClosed={handleCloseModalPerfil} />
          </View>
        </Modal>
        <Modal visible={openAddLinks} presentationStyle='fullScreen' animationType='fade' style={{ backgroundColor: '#000', flex: 1 }} >
          <View style={{ flex: 1, backgroundColor: "#0000002f" }}>
            <AddLink onClose={handleCloseModalLinks} selectingLinks={setAddLink} selectedLinks={addLink} />
          </View>
        </Modal>
        <Modal visible={openEditLinks} transparent={true} presentationStyle='overFullScreen' animationType='fade' style={{ backgroundColor: '#000', flex: 1 }} >
          <View
            style={{ flex: 1, backgroundColor: "#0000002f" }}
          >
            <EditLink onClosed={handleCloseModalEditLinks} linkEdit={editLink} />
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </View >
  )
}

export default Perfil
