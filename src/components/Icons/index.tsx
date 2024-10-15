import React from 'react';
import { SvgProps } from 'react-native-svg';
import Heart from '../../../assets/images/svgs/heart.svg';
import Menu from '../../../assets/images/svgs/menu.svg';
import Map from '../../../assets/images/svgs/map.svg';
import Perfil from '../../../assets/images/svgs/perfil.svg';
import User from '../../../assets/images/svgs/user-svgrepo-com.svg';
import Pencil from '../../../assets/images/svgs/pencil.svg';
export const Icons = {
  heart: (props: SvgProps) => <Heart {...props} />,
  perfil: (props: SvgProps) => <Perfil {...props} />,
  menu: (props: SvgProps) => <Menu {...props} />,
  map: (props: SvgProps) => <Map {...props} />,
  user: (props: SvgProps) => <User {...props} />,
  pencil: (props: SvgProps) => <Pencil {...props} />,
}