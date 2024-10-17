import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Icons } from '../Icons'

interface IconEditProps extends TouchableOpacityProps {
  sizeIcon: number;
  colorIcon: string;
}

export default function IconEdit({ sizeIcon, colorIcon, ...rest }: IconEditProps) {
  return (<>
    <TouchableOpacity {...rest}>
      <Icons.pencil color={colorIcon} width={sizeIcon} height={sizeIcon} />
    </TouchableOpacity>
  </>














  )
}
