import Button from '@/components/Button';
import React from 'react';
import { View, Text, Image, TouchableOpacity, Platform, ScrollView, Linking } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icons } from '@/components/Icons';
import { router, useNavigation } from 'expo-router';
import CardConfiguration from '@/components/CardConfiguration';
import classNames from 'classnames';
import { userStore } from '@/store/userStore';
import Entypo from '@expo/vector-icons/Entypo';
import useUpdateUserInfo from '@/queries/user/updateUser';



function Menu() {

  const { userInfo, profile, logout } = userStore()
  const { mutate: updateUserInfo } = useUpdateUserInfo()
  function Faq() {
    Linking.openURL(`http://api.whatsapp.com/send?phone=${+5511997881651}`)
  }

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      <View className='flex-1 bg-white pt-16 p-8 justify-between'>

        <View className='gap-10  items-center justify-between'>
          <Text className='font-inter-700 text-[26px] '>Menu</Text>


          <TouchableOpacity
            className={classNames('w-full flex-row p-3 justify-between items-center bg-white rounded-xl', {
              'shadow-lg shadow-black/70': Platform.OS === "android"
            }, {
              'shadow-sm shadow-black/70': Platform.OS === "ios"
            })}
            onPress={() => router.navigate('/(perfil)/')}
          >

            <View className='flex-row justify-between items-center gap-2'>
              <View className='rounded-full  overflow-hidden' style={{ borderColor: profile?.temaPerfil, borderWidth: 3 }}>
                {profile?.fotoPerfil ? <Image source={{ uri: profile.fotoPerfil }} className=' w-16 h-16 ' /> :
                  <Icons.user
                    width={35}
                    height={35}
                    color={'#528A8C'}
                  />}

              </View>
              <View className='bg-black'></View>
              <View className='flex-1'>
                {(userInfo?.nomeUsuario || profile?.nomePerfil) && <Text className='color-[#374151] font-inter-600 flex-wrap'>{profile?.nomePerfil ? profile.nomePerfil : userInfo?.nomeUsuario}</Text>}
                {profile?.ocupacao && <Text className='color-[#6B7280] font-inter-500 flex-wrap'>{profile?.ocupacao}</Text>}
              </View>
              <TouchableOpacity className='bg-[#F9F9F9] p-3 rounded-full'>
                <MaterialCommunityIcons name="bell-outline" size={25} color="#374151" />
              </TouchableOpacity>
            </View>

          </TouchableOpacity>

          <CardConfiguration bigContainer={true} title='Preferências' onPress={() => router.navigate('/(private)/(menu)/preference')}>
            <Icons.preference width={25} height={25} />
          </CardConfiguration>


          <View className={classNames('p-4 gap-2 bg-white rounded-xl', {
            'shadow-lg shadow-black/70': Platform.OS === "android"
          }, {
            'shadow-sm shadow-black/70': Platform.OS === "ios"
          })}>

            <CardConfiguration title='Idioma' onPress={() => router.navigate('/(menu)/languanges')}>
              <Icons.translate width={25} height={25} />
            </CardConfiguration>

            <CardConfiguration title='Feedback'>
              <Icons.feedback width={25} height={25} />
            </CardConfiguration>

            <CardConfiguration title='Avalie a Konne'>
              <Icons.rate width={25} height={25} />
            </CardConfiguration>

            <CardConfiguration title='Atualizações'>
              <Icons.update width={25} height={25} />
            </CardConfiguration>

            <CardConfiguration title='Fale Konnosco' onPress={Faq}>
              <Entypo name="megaphone" size={24} color="black" />
            </CardConfiguration>

          </View>
        </View>
        <Button title='Sair da Conta' variant='exit' onPress={() => {
          updateUserInfo({ id: userInfo?.cdUsuario, data: { online: false } });
          logout();
        }} />
      </View >
    </ScrollView>
  )
}

export default Menu
