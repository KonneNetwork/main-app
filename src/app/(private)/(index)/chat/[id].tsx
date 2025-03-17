import CardUsers from '@/components/CardUsers'
import { usersData } from '@/mock/userData'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, Image, TextInput, FlatList, KeyboardAvoidingView, Platform, Dimensions } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'


export default function Chat() {
  const { id } = useLocalSearchParams()
  const [messages, setMessages] = useState<string[] | undefined | string>('')
  const [message, setMessage] = useState('')

  const friendId = usersData[usersData.findIndex(item => item.id === Number(id))]

  const screenHeight = Dimensions.get('screen').height;
  const insets = useSafeAreaInsets();
  function sendMessage() {
    if (message) {
      setMessages((prevStatus) => [...prevStatus!, message])
    }
    setMessage('')
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  >
      <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 30 }}>
        <View className='flex-row items-center gap-3'>
          <Ionicons name="chevron-back-outline" size={32} color="black" onPress={() => router.back()} />
          {/* <CardUsers imageCardSize={60} name={friendId.nome} thema={friendId.colorTheme} image={friendId.image} /> */}
        </View>
        <FlatList data={messages} style={{ flex: 1, backgroundColor: 'white' }}
          inverted
          contentContainerStyle={{ flexDirection: 'column-reverse' }}
          renderItem={({ item }) => {
            return (
              <View className="max-w-[80%] min-w-[5%] w-auto bg-surface-brand-main-default/40 p-2 m-2 rounded-xl self-end"><Text className='flex-wrap w-auto'>{item}</Text></View>)
          }}


        />
        <View className='w-full bg-surface-neutral-selected/30 items-center flex-row gap-5 py-2 px-4' >
          <TextInput className='flex-1 border-1 p-2 rounded-md' multiline value={message} onChangeText={(e) => setMessage(e)} />
          <Ionicons name="send" size={24} color={"#528A8C"} onPress={() => sendMessage()} />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
