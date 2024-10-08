import React from 'react';
import { SvgProps } from 'react-native-svg';
import Heart from "../../../assets/images/heart.svg"
import Menu from '../../../assets/images/Vector.svg'
import Map from '../../../assets/images/map.svg'
import Perfil from '../../../assets/images/perfil.svg'

export const Icons = {
  heart: (props: SvgProps) => <Heart {...props} />,
  perfil: (props: SvgProps) => <Perfil {...props} />,
  menu: (props: SvgProps) => <Menu {...props} />,
  map: (props: SvgProps) => <Map {...props} />,

}