import React, { useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import InputSearch from '@/components/InputSearch';
import { dataLinks } from '@/constants/mediasLink';

interface AddLinksProps {
  onClose: () => void;
  selectingLinks: React.Dispatch<React.SetStateAction<{ name: string, icon: React.JSX.Element }[] | undefined | null>>;
  selectedLinks: { name: string, icon: React.JSX.Element }[] | undefined | null
}

export default function AddLink({ onClose, selectingLinks, selectedLinks }: AddLinksProps) {

  const dimenssaoWidth = Dimensions.get('screen').width;
  const itemWidth = (dimenssaoWidth - 100) / 3;
  const [search, setSearch] = useState('');

  const handleItemPress = (item: { name: string, icon: React.JSX.Element }) => {

    if (!selectedLinks?.find(link => link.name === item.name)) {
      selectingLinks((prevState) => {
        const updatedLinks = prevState ? [...prevState, item] : [item];
        return updatedLinks;
      });
    }

    console.log(selectedLinks)
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
            <InputSearch value={search} onChangeText={setSearch} />
          </View>
        }
        sections={dataLinks}
        keyExtractor={(item, index) => item.name + index}
        renderItem={() => null}
        renderSectionHeader={({ section: { title, data } }) => (
          <View className=' my-6 mx-8'>
            <Text className='font-roboto-400 text-xl'>{title}</Text>
            <FlatList
              data={data.filter(data => { return data.name.includes(search) })}
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'space-between',
              }}
              bounces={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity style={[styles.item, { width: itemWidth }]} onPress={() => handleItemPress(item)}>
                  {item.icon}
                  <Text className='font-roboto-500 text-sm'>{item.name}</Text>
                </TouchableOpacity>
              )}
              numColumns={3}
            />
          </View>
        )}
      />
    </View>
  );
}
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