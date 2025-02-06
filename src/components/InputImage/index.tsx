import React from 'react'
import { TouchableOpacity, View, Image, TouchableOpacityProps, ImageProps } from 'react-native'
import { Icons } from '../Icons'
import IconEdit from '../IconEdit'
import { CameraView } from 'expo-camera'


interface InputImageProps extends ImageProps {
  image?: string,
  isEdit?: boolean,
  onOpen?: () => void,
  colorBorder?: string,
  colorIcon?: string,
}
export default function InputImage({ image, isEdit, onOpen, colorBorder = "#528A8C", colorIcon = "#528A8C", ...rest }: InputImageProps) {

  return (
    <TouchableOpacity {...rest} onPress={onOpen}>

      <View className='border-8 h-44 w-44 rounded-full items-center overflow-hidden' style={{ borderColor: colorBorder }}>
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
            color={colorIcon}
          />
        }

      </View>
      {!isEdit &&
        <IconEdit colorIcon='#fff' sizeIcon={20} className='absolute bottom-0 right-0 bg-[#222222]/30 p-2 rounded-full m-2' onPress={onOpen} />
      }
    </TouchableOpacity>
  )
}
