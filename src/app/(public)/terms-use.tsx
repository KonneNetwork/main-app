import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function termsUse() {
  return (
    <SafeAreaView className='flex-1 bg-white p-8'>
      <StatusBar />
      <View className='flex-row  items-center '>
        <Ionicons name="chevron-back-outline" size={32} color="black" onPress={() => router.back()} />
        <Text className='color-[#528A8C] font-inter-400 text-2xl flex-1 text-center'>Konne</Text>
      </View>
      <Text className='text-center font-inter-600 text-5xl m-5'>Termos de Uso</Text>

      <ScrollView className='flex-grow w-full'>
        <Text className='color-[#333333] text-justify font-inter-400 text-base'>Este instrumento, bem como outros termos, contratos, políticas, regras, exigências, limitações, sinalizações,
          notas, notificações e demais condições disponíveis no app Konne, inclusive termos de uso de produtos específicos
          e a Política de Segurança e Privacidade da Konne localizada no endereço http://www.konne.com/privacidade.html
          (“Política de Privacidade”), documentos estes passíveis de alteração e tal como vigentes à época de utilização do app Konne
          (doravante, todos, em conjunto, denominados "Termos Gerais"), regulamentam a disponibilização e a utilização e acesso pelo usuário
          (doravante simplesmente denominado “Você”) aos Conteúdos (conforme definição do termo abaixo), bem como limitam a responsabilidade
          da KONNE S.A., por sua filial localizada na Avenida, nº 1000, na cidade e Estado de São Paulo, Brasil, CEP: 11.111-111, inscrita no
          Cadastro Nacional da Pessoa Jurídica do Ministério da Fazenda Brasileiro (CNPJ/MF) sob o nº 11.111.111/1111-1 pela disponibilização
          dos mesmos.
        </Text>
        <Text className='color-[#333333] text-justify font-inter-400 text-base'>
          Esta política permitirá que você saiba:
        </Text>

        <Text className='color-[#333333] font-inter-400 text-base'>
          Direitos sobre o conteúdo disponibilizado;{'\n'}
          Isenção de responsabilidade;{'\n'}
          Segurança e fluxo normal de comunicações entre servidores;{'\n'}
          Aceitação;{'\n'}
          Suspensão, bloqueio e exclusão;{'\n'}
          Condições gerais.{'\n'}
        </Text>
      </ScrollView>
      <View className='flex-row flex-1 items-end justify-between'>
        <Text className='text-sm color-[#666666] font-inter-400'> © 2023-2024 Konne S.A </Text>
        <TouchableOpacity onPress={() => router.navigate('/(public)/police-privacy')}>
          <Text className='text-base color-[#33586C] font-inter-700'> POLÍTICA DE PRIVACIDADE </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
