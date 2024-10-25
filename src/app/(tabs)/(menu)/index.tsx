import Button from '@/components/Button'
import React from 'react'
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Platform } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icons } from '@/components/Icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import CardConfiguration from '@/components/CardConfiguration';
import classNames from 'classnames';
import { ScrollView } from 'react-native-gesture-handler';



function Menu() {

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, flexGrow: 1 }}>
      <View className='flex-1 bg-white p-8 justify-between'>

        <View className='gap-10  items-center justify-between'>
          <Text className='font-inter-700 text-[26px] '>Menu</Text>


          <View className={classNames('w-full flex-row p-3 justify-between items-center bg-white rounded-xl', {
            'shadow-lg shadow-black/70': Platform.OS === "android"
          }, {
            'shadow-sm shadow-black/70': Platform.OS === "ios"
          })}>

            <View className='flex-row justify-between items-center gap-4'>
              <View className='rounded-full'>
                <Image source={require('../../../../assets/images/userImage.png')} width={44} height={44} />
              </View>
              <View>
                <Text className='color-[#374151] font-inter-600'>Gabriela J</Text>
                <Text className='color-[#6B7280] font-inter-500'>UX / UI designer</Text>
              </View>
            </View>
            <TouchableOpacity className='bg-[#F9F9F9] p-3 rounded-full'>
              <MaterialCommunityIcons name="bell-outline" size={25} color="#374151" />
            </TouchableOpacity>
          </View>

          <CardConfiguration bigContainer={true} title='Preferências' onPress={() => router.navigate('/(tabs)/(menu)/preference')}>
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
        <Button title='Sair da Conta' variant='exit' />
      </View >
    </ScrollView>
  )
}

export default Menu

function useState(arg0: string): [any, any] {
  throw new Error('Function not implemented.');
}
