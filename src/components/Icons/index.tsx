import React from 'react';
import { SvgProps } from 'react-native-svg';
import Heart from '../../../assets/images/svgs/heart.svg';
import Menu from '../../../assets/images/svgs/menu.svg';
import Map from '../../../assets/images/svgs/map.svg';
import Perfil from '../../../assets/images/svgs/perfil.svg';
import User from '../../../assets/images/svgs/user-svgrepo-com.svg';
import Pencil from '../../../assets/images/svgs/pencil.svg';
import Instagram from '../../../assets/images/svgs/instagram.svg';
import Linkeding from '../../../assets/images/svgs/linkeding.svg';
import Skype from '../../../assets/images/svgs/skype.svg';
import Snapchat from '../../../assets/images/svgs/snapchat.svg';
import Facebook from '../../../assets/images/svgs/facebook.svg';
import Twitter from '../../../assets/images/svgs/twitter.svg';
import YouTube from '../../../assets/images/svgs/youtube.svg';
import Pinterest from '../../../assets/images/svgs/pinterest.svg';
import Telefone from '../../../assets/images/svgs/telefone.svg';
import Mensagem from '../../../assets/images/svgs/mensagem.svg';
import WhatsApp from '../../../assets/images/svgs/whatsapp.svg';
import Email from '../../../assets/images/svgs/email.svg';
import Telegram from '../../../assets/images/svgs/telegram.svg';
import Maps from '../../../assets/images/svgs/maps.svg';
import Behance from '../../../assets/images/svgs/behance.svg';
import Dribble from '../../../assets/images/svgs/dribble.svg';
import Website from '../../../assets/images/svgs/website.svg';
import GoogleReviews from '../../../assets/images/svgs/googlereview.svg';
import AppLinks from '../../../assets/images/svgs/applink.svg';

export const Icons = {
  heart: (props: SvgProps) => <Heart {...props} />,
  perfil: (props: SvgProps) => <Perfil {...props} />,
  menu: (props: SvgProps) => <Menu {...props} />,
  map: (props: SvgProps) => <Map {...props} />,
  user: (props: SvgProps) => <User {...props} />,
  pencil: (props: SvgProps) => <Pencil {...props} />,
  intagram: (props: SvgProps) => <Instagram {...props} />,
  linkeding: (props: SvgProps) => <Linkeding {...props} />,
  skype: (props: SvgProps) => <Skype {...props} />,
  snapchat: (props: SvgProps) => <Snapchat {...props} />,
  facebook: (props: SvgProps) => <Facebook {...props} />,
  twitter: (props: SvgProps) => <Twitter {...props} />,
  youtube: (props: SvgProps) => <YouTube {...props} />,
  pinterest: (props: SvgProps) => <Pinterest {...props} />,
  telefone: (props: SvgProps) => <Telefone {...props} />,
  mensagem: (props: SvgProps) => <Mensagem {...props} />,
  whatsapp: (props: SvgProps) => <WhatsApp {...props} />,
  email: (props: SvgProps) => <Email {...props} />,
  telegram: (props: SvgProps) => <Telegram {...props} />,
  maps: (props: SvgProps) => <Maps {...props} />,
  behance: (props: SvgProps) => <Behance {...props} />,
  dribble: (props: SvgProps) => <Dribble {...props} />,
  website: (props: SvgProps) => <Website {...props} />,
  googlereviews: (props: SvgProps) => <GoogleReviews {...props} />,
  applink: (props: SvgProps) => <AppLinks {...props} />,
}