import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TouchableOpacity, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import InputPerfil from '@/components/InputPerfil';
import HeaderUser from '@/components/HeaderUser';
import EditPerfil from './edit-perfil';
import AddLink from './add-link';

function Perfil() {
  const [openPerfil, setOpenPerfil] = useState(false);
  const [openLinks, setOpenLinks] = useState(false);
  const [addLink, setAddLink] = useState<{ name: string, icon: React.JSX.Element }[] | undefined | null>(null);

  const dimenssaoWidth = Dimensions.get('screen').width;
  const itemWidth = (dimenssaoWidth - 100) / 3;

  function handleCloseModalPerfil() {
    setOpenPerfil(false)
  }

  function handleOpenModalPerfil() {
    setOpenPerfil(true)
  }

  function handleCloseModalLinks() {
    setOpenLinks(false)
  }

  function hadleOpenModalLinks() {
    setOpenLinks(true)
  }

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

              <HeaderUser onOpen={handleOpenModalPerfil} />

              <InputPerfil isEditable={false} multiline={true} label='Nome' placeholder='Escreva um texto de apresentação ...' onOpen={handleCloseModalPerfil} />


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
                onPress={hadleOpenModalLinks}
              >
                <Feather name="plus" size={24} color="black" />
                <Text className='font-roboto-500 text-base'>
                  Adicionar link
                </Text>
              </TouchableOpacity>


              <Modal visible={openPerfil} transparent={true} presentationStyle='overFullScreen' animationType='fade' style={{ backgroundColor: '#000', flex: 1 }} >
                <View style={{ flex: 1, backgroundColor: "#0000002f" }}>
                  <EditPerfil onClosed={handleCloseModalPerfil} />
                </View>
              </Modal>
              <Modal visible={openLinks} presentationStyle='fullScreen' animationType='fade' style={{ backgroundColor: '#000', flex: 1 }} >
                <View style={{ flex: 1, backgroundColor: "#0000002f" }}>
                  <AddLink onClose={handleCloseModalLinks} selectingLinks={setAddLink} selectedLinks={addLink} />
                </View>
              </Modal>
            </>
          }
          contentContainerStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 30,

          }}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.item, { width: itemWidth }]}>
              {item.icon}
              <Text className='font-roboto-500 text-sm'>{item.name}</Text>
            </TouchableOpacity>
          )}
          numColumns={3}
        />

      </KeyboardAvoidingView>
    </View >
  )
}

export default Perfil


const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    justifyContent: 'center',
    height: 99,
    alignItems: 'center',
    marginTop: 20,
    marginRight: 20,
    backgroundColor: '#F4F4F4'
  },
  itemText: {
    marginTop: 5,
    fontSize: 16,
  },
});