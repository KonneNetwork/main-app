import React, { useEffect, useState } from 'react';
import { View, Text, SectionList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import InputSearch from '@/components/InputSearch';
import { Categorias, dataLinks } from '@/constants/mediasLink';
import CardMedia from '@/components/CardMedia';
import getMidias from '@/queries/Profile/getMidias';
import { useCreateSocialMidiaLink } from '@/queries/Profile/createMidiaLinks';
import { userStore } from '@/store/userStore';

interface AddLinksProps {
  onClose: () => void;
  selectingLinks: React.Dispatch<React.SetStateAction<any | { label: string, link: string, category: string }[] | undefined | null>>;
  selectedLinks: {
    midia: any; label: string, link: string, category: string
  }[] | undefined | null
}

export default function AddLink({ onClose, selectedLinks }: AddLinksProps) {
  const { data } = getMidias();
  const { profile } = userStore()
  const [midias, setMidias] = useState<any[] | undefined>([])
  const [search, setSearch] = useState('');
  const { mutate: createMidiaSocialLink } = useCreateSocialMidiaLink(profile?.cdPerfil ?? '', onClose)


  const handleItemPress = (item: any | { label: string, link: string, category: string }) => {

    if (!selectedLinks?.find(link => link?.midia === item.midia)) {
      createMidiaSocialLink({
        cdPerfil: profile?.cdPerfil || '',
        cdSocialMidia: item?.cd_social_midia || '',
      })
      // selectingLinks((prevState: any) => {
      //   const updatedLinks = prevState ? [...prevState, item] : [item];
      //   return updatedLinks;
      // });
    }
    onClose();
  };

  useEffect(() => {
    setMidias(data)
  }, [data])

  return (
    <View className='flex-1 bg-surface-primary'>
      <SectionList
        contentContainerStyle={{ paddingVertical: 30 }}
        showsVerticalScrollIndicator={false}
        className='flex-1'
        ListHeaderComponent={
          <View className='m-8'>
            <View className='flex-row items-center justify-center'>
              <Ionicons name="chevron-back-outline" size={30} color="black" onPress={onClose} />
              <Text className='flex-1 text-center text-xl font-roboto-700'>Adicionar Link</Text>
            </View>
            <InputSearch value={search} onChangeText={setSearch} placeholder='Buscar por links' />
          </View>
        }
        sections={Categorias.map(item => ({
          title: item,
          data: Object.values(midias ?? '').filter(link => link?.tipo_midia === item)
        }))}
        keyExtractor={(item, index) => item?.midia + index}
        renderItem={() => null}

        renderSectionHeader={({ section }) => {
          return (
            <View className=' my-6 mx-8'>
              <Text className='font-roboto-400 text-xl'>{section.title}</Text>
              <FlatList
                data={section.data.filter(data => { return data.midia.includes(search) })}
                contentContainerStyle={{
                  flex: 1,
                  justifyContent: 'space-between',
                }}
                bounces={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item?.midia}
                renderItem={({ item }) => (

                  <CardMedia infoCard={item} onPress={() => handleItemPress(item)} />
                )}
                numColumns={3}
              />
            </View>

          )
        }}
      />
    </View>
  );
}