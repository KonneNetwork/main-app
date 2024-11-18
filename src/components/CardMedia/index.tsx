import React from 'react'
import { TouchableOpacity, Text, TouchableOpacityProps, Dimensions, StyleSheet } from 'react-native'
import IconEdit from '../IconEdit';
import { Icons } from '../Icons';

interface CardMedia extends TouchableOpacityProps {
  infoCard: { label: string, link: string, category: string };
  isEditabled?: boolean;
  openModal?: (link: { label: string, link: string, category: string } | null) => void
}

export default function CardMedia({ infoCard, isEditabled = true, openModal = () => { }, ...rest }: CardMedia) {
  const name = infoCard?.label.toLowerCase().toString().replace(" ", '')
  const Icon = Icons[name as keyof typeof Icons];
  const dimenssaoWidth = Dimensions.get('screen').width;
  const itemWidth = (dimenssaoWidth - 100) / 3;

  return (

    <TouchableOpacity style={[styles.item, { width: itemWidth }]} {...rest} disabled={!isEditabled} >
      <Icon width={60} height={60} />
      <Text className='font-roboto-500 text-sm'>{infoCard?.label}</Text>
      {!isEditabled &&
        <IconEdit
          colorIcon='#fff'
          sizeIcon={20}
          className='absolute top-[-15] right-[-15] bg-[#222222]/30 p-2 rounded-full m-2'
          onPress={() => openModal(infoCard)}
        />
      }
    </TouchableOpacity>

  )
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
});