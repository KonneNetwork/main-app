import React, { useState } from 'react';
import { View, Text, SectionList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import InputSearch from '@/components/InputSearch';
import { Categorias, dataLinks } from '@/constants/mediasLink';
import CardMedia from '@/components/CardMedia';

interface AddLinksProps {
  onClose: () => void;
  selectingLinks: React.Dispatch<React.SetStateAction<{ label: string, icon: React.JSX.Element, category: string }[] | undefined | null>>;
  selectedLinks: { label: string, icon: React.JSX.Element, category: string }[] | undefined | null
}

export default function AddLink({ onClose, selectingLinks, selectedLinks }: AddLinksProps) {

  const [search, setSearch] = useState('');

  const handleItemPress = (item: { label: string, icon: React.JSX.Element, category: string }) => {

    if (!selectedLinks?.find(link => link.label === item.label)) {
      selectingLinks((prevState) => {
        const updatedLinks = prevState ? [...prevState, item] : [item];
        return updatedLinks;
      });
    }
    onClose();
  };

  return (
    <View className='flex-1 bg-surface-primary'>
      <SectionList
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
          data: Object.values(dataLinks).filter(link => link?.category === item)
        }))}
        keyExtractor={(item, index) => item.label + index}
        renderItem={() => null}

        renderSectionHeader={({ section }) => {
          return (
            <View className=' my-6 mx-8'>
              <Text className='font-roboto-400 text-xl'>{section.title}</Text>
              <FlatList
                data={section.data.filter(data => { return data.label.includes(search) })}
                contentContainerStyle={{
                  flex: 1,
                  justifyContent: 'space-between',
                }}
                bounces={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.label}
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