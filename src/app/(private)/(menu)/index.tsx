import Button from '@/components/Button'
import React from 'react'
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Platform, ScrollView, StyleSheet } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icons } from '@/components/Icons';
import { router, useNavigation } from 'expo-router';
import CardConfiguration from '@/components/CardConfiguration';
import classNames from 'classnames';
import { BlurView } from 'expo-blur';
import { userStore } from '@/store/userStore';



function Menu() {

  const navigation = useNavigation();
  const { profile, logout } = userStore()

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      <View className='flex-1 bg-white p-8 justify-between'>

        <View className='gap-10  items-center justify-between'>
          <Text className='font-inter-700 text-[26px] '>Menu</Text>


          <View className={classNames('w-full flex-row p-3 justify-between items-center bg-white rounded-xl', {
            'shadow-lg shadow-black/70': Platform.OS === "android"
          }, {
            'shadow-sm shadow-black/70': Platform.OS === "ios"
          })}>

            <View className='flex-row justify-between items-center gap-4'>
              <View className='rounded-full overflow-hidden'>
                <Image source={{ uri: profile?.image }} className=' w-16 h-16 ' />
                {/* <BlurView intensity={10} style={StyleSheet.absoluteFill} blurReductionFactor={3} experimentalBlurMethod='dimezisBlurView' /> */}
              </View>
              <View>
                <Text className='color-[#374151] font-inter-600'>{profile?.nome}</Text>
                <Text className='color-[#6B7280] font-inter-500'>{profile?.ocupacao}</Text>
              </View>
            </View>
            <TouchableOpacity className='bg-[#F9F9F9] p-3 rounded-full'>
              <MaterialCommunityIcons name="bell-outline" size={25} color="#374151" />
            </TouchableOpacity>
          </View>

          <CardConfiguration bigContainer={true} title='Preferências' onPress={() => router.navigate('/(private)/(menu)/preference')}>
            <Icons.preference width={25} height={25} />
          </CardConfiguration>


          <View className={classNames('p-4 gap-2 bg-white rounded-xl', {
            'shadow-lg shadow-black/70': Platform.OS === "android"
          }, {
            'shadow-sm shadow-black/70': Platform.OS === "ios"
          })}>

            <CardConfiguration title='Linguagem'>
              <Icons.translate width={25} height={25} />
            </CardConfiguration>

            <CardConfiguration title='Feedback'>
              <Icons.feedback width={25} height={25} />
            </CardConfiguration>

            <CardConfiguration title='Avalie a Konne na loja'>
              <Icons.rate width={25} height={25} />
            </CardConfiguration>

            <CardConfiguration title='Atualizações'>
              <Icons.update width={25} height={25} />
            </CardConfiguration>

          </View>
        </View>
        <Button title='Sair da Conta' variant='exit' onPress={() => {
          logout()
        }} />
      </View >
    </ScrollView>
  )
}

export default Menu
