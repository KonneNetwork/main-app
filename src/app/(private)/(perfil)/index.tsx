import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, View, FlatList } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import InputPerfil from '@/components/InputPerfil';
import HeaderUser from '@/components/HeaderUser';
import EditPerfil from './edit-perfil';
import AddLink from './add-link';
import CardMedia from '@/components/CardMedia';
import EditLink from './edit-link';
import { useStore } from 'zustand';
import { userStore } from '@/store/userStore';
import Slider from '@react-native-community/slider';

function Perfil() {
  const [openPerfil, setOpenPerfil] = useState(false);
  const [openAddLinks, setOpenAddLinks] = useState(false);
  const [openEditLinks, setOpenEditLinks] = useState(false);
  const { profile } = userStore();
  const [addLink, setAddLink] = useState<{ label: string, link: string, category: string }[] | undefined | null>(undefined);
  const [editLink, setEditLink] = useState<{ label: string, link: string, category: string } | null>(null);
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

  function removeLink(link: string | undefined) {
    const itemRemove = addLink?.findIndex(item => item.label === link)
    addLink?.splice(itemRemove!, 1)
  }


  useEffect(() => {
    return setAddLink(profile?.links);
  }, [])

  return (
    <View className='flex-1'>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          className='bg-surface-primary flex-1'
          data={addLink}
          ListHeaderComponentStyle={{ alignItems: 'center' }}
          ListHeaderComponent={
            <>
              <Text className='font-roboto-700 text-xl mt-8'>Meu Perfil</Text>

              <HeaderUser image={profile?.image} occupation={profile?.ocupacao} userName={profile?.nome} onOpen={handleOpenModalPerfil} />

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
            paddingHorizontal: 30,

          }}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.label}
          renderItem={({ item }) => (
            <CardMedia infoCard={item} isEditabled={false} openModal={hadleOpenModalEditLinks} />
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
          <View className=''
            style={{ flex: 1, backgroundColor: "#0000002f" }}
          >
            <EditLink onClosed={handleCloseModalEditLinks} linkEdit={editLink} remove={removeLink} />
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </View >
  )
}

export default Perfil
