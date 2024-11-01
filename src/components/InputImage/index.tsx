import React from 'react'
import { TouchableOpacity, View, Image, TouchableOpacityProps } from 'react-native'
import { Icons } from '../Icons'
import IconEdit from '../IconEdit'


interface InputImageProps extends TouchableOpacityProps {
  image?: string,
  isEdit?: boolean,
  onOpen?: () => void,
  color?: string,
}
export default function InputImage({ image, isEdit, onOpen, color = "#528A8C", ...rest }: InputImageProps) {

  const disabledTouch = image ? true : false

  return (
    <TouchableOpacity {...rest} onPress={onOpen} disabled={disabledTouch}>

      <View className='border-8 h-44 w-44 rounded-full items-center overflow-hidden' style={{ borderColor: color }}>
        {image ?
          <Image
            source={{ uri: image }}
            resizeMode='cover'
            className=' h-full w-full'
          />
          :
          <Icons.user
            width={160}
            height={160}
            color={'#528A8C'}
          />
        }

      </View>
      {/*Icone de edição*/}
      {!isEdit &&
        // <View className='absolute bottom-0 right-0 bg-[#222222]/30 p-2 rounded-full m-2'>
        //   <Icons.pencil color={'#fff'} width={20} height={20} />
        // </View>
        <IconEdit colorIcon='#fff' sizeIcon={20} className='absolute bottom-0 right-0 bg-[#222222]/30 p-2 rounded-full m-2' onPress={onOpen} />
      }
    </TouchableOpacity>
  )
}
