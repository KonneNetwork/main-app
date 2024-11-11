import Button from '@/components/Button'
import { Icons } from '@/components/Icons'
import InputSearch from '@/components/InputSearch'
import Ionicons from '@expo/vector-icons/Ionicons'
import classNames from 'classnames'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { usersData } from '@/mock/userData'
import Card from '@/components/Card'
import CardUsers from '@/components/CardUsers'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

function Index() {

  const [activeAba, setActiveAba] = useState<'konnectados' | 'pedido-konnexao'>('konnectados');

  const konnectionAba = activeAba === 'konnectados';
  const [search, setSearch] = useState('')

  const filteredData = usersData.filter((item) => {
    // Filtra pela lógica de konnectado e pela pesquisa de texto
    const matchesKonnectado = item.konnectado === (konnectionAba ? true : false);
    const matchesSearch = item.nome.toLowerCase().includes(search.toLowerCase());

    return matchesKonnectado && matchesSearch;
  });


  if (usersData.length <= 0) {
    return (
      <View className='flex-1 bg-white p-8'>
        <View className='flex-row justify-between mt-10'>
          <Text className='font-inter-700 text-3xl '>Konnexões</Text>
          <InputSearch placeholder='Buscar' smallSearch={true} value={search} onChangeText={setSearch} />
        </View>

        <View className='flex-row justify-between mt-10'>
          <TouchableOpacity className={classNames({ 'border-b-4 border-b-[#528A8C] flex-1 p-3': activeAba === 'konnectados' }, {
            'border-b-1 border-b-[#E7EEF0] flex-1  p-3': activeAba !== 'konnectados'
          })} onPress={() => setActiveAba('konnectados')}>
            <Text className={classNames({ 'font-inter-500 text-lg color-[#000] text-center ': activeAba === 'konnectados' },
              { 'font-inter-500 text-lg color-[#506773] text-center': activeAba !== 'konnectados' })}>
              Konnectados
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className={classNames({ 'border-b-4 border-b-[#528A8C] w-3/5 p-3': activeAba === 'pedido-konnexao' }, {
            'border-b-1 border-b-[#E7EEF0] w-3/5  p-3': activeAba !== 'pedido-konnexao'
          })} onPress={() => setActiveAba('pedido-konnexao')}>
            <Text className={classNames({ 'font-inter-500 text-lg color-[#000] text-center ': activeAba === 'pedido-konnexao' },
              { 'font-inter-500 text-lg color-[#506773] text-center': activeAba !== 'pedido-konnexao' })}>
              Pedidos de Konnexão
            </Text>
          </TouchableOpacity>
        </View>



        <View className='flex-1 justify-center items-center gap-7'>
          <View className='self-center bg-[#003F5866]/10 p-4 rounded-xl '>
            <Icons.heart color={'#528A8C'} width={40} height={40} />
          </View>

          <View>
            <Text className='font-inter-700 text-xl text-center'>{konnectionAba ? "Você ainda não possui konnexões" : "Aceite ou rejeite pedidos de konnexões"}</Text>
            <View className=' flex-row flex-wrap'>
              <Text className='font-inter-400 text-lg color-[#506773] text-center align-middle justify-center items-center'>
                Para enviar um pedido de konnexão basta selecionar o ícone {<Ionicons name='heart' size={24} color={'#528A8C'} className='absolute' />} no perfil dos usuários que desejar se konnectar.
              </Text>
            </View>
          </View>

          <Button title='Konnectar com pessoas próximas' variant='active' />
        </View>

      </View >
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        className='flex-1 bg-surface-primary'
        data={filteredData}
        renderItem={({ item }) => {
          return (
            <CardUsers titleButton={konnectionAba ? 'mensagem' : 'aceitar'} name={item.nome} distance={item.distancia} occupation={item.ocupacao} />
          )
        }}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 30,
        }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View className='flex-row justify-between '>
              <Text className='font-inter-700 text-3xl '>Konnexões</Text>
              <InputSearch placeholder='Buscar' smallSearch={true} value={search} onChangeText={setSearch} />
            </View>

            <View className='flex-row justify-between mt-10'>
              <TouchableOpacity className={classNames({ 'border-b-4 border-b-[#528A8C] flex-1 p-3': activeAba === 'konnectados' }, {
                'border-b-1 border-b-[#E7EEF0] flex-1  p-3': activeAba !== 'konnectados'
              })} onPress={() => setActiveAba('konnectados')}>
                <Text className={classNames({ 'font-inter-500 text-lg color-[#000] text-center ': activeAba === 'konnectados' },
                  { 'font-inter-500 text-lg color-[#506773] text-center': activeAba !== 'konnectados' })}>
                  Konnectados
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className={classNames({ 'border-b-4 border-b-[#528A8C] w-3/5 p-3': activeAba === 'pedido-konnexao' }, {
                'border-b-1 border-b-[#E7EEF0] w-3/5  p-3': activeAba !== 'pedido-konnexao'
              })} onPress={() => setActiveAba('pedido-konnexao')}>
                <Text className={classNames({ 'font-inter-500 text-lg color-[#000] text-center ': activeAba === 'pedido-konnexao' },
                  { 'font-inter-500 text-lg color-[#506773] text-center': activeAba !== 'pedido-konnexao' })}>
                  Pedidos de Konnexão{(filteredData.length > 0) && `(${filteredData.length})`}
                </Text>
              </TouchableOpacity>
            </View>

            <Text className='font-inter-400 text-sm color-[#3C3C4399]/60 py-2'>{konnectionAba ? "Gerencie suas konnexões" : "Aceite ou rejeite pedidos de konnexões"}</Text>
          </>
        }

        ListFooterComponent={
          <>
            {activeAba === 'konnectados' && <><View className='flex-row justify-between'>
              <Text className='text-xl font-inter-600'>Pessoas Próximas de você</Text>
              <Text className='font-inter-400 color-[#528A8C] text-base'>Ver todas</Text>
            </View>
              <Text className='font-inter-400 text-sm color-[#3C3C4399]/60 py-2'>Konnexões a menos de 1 km de distância</Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                className='flex-grow'
                data={usersData.filter(item => item.distancia < 1000 && item.konnectado === false)}
                contentContainerStyle={{ gap: 16, flexGrow: 1 }}
                horizontal
                keyExtractor={item => item.cpf}
                renderItem={({ item }) => {
                  return <Card key={item.cpf} nome={item.nome} descricao={item.descricao} distance={item.distancia} onPress={() => router.navigate('/(private)/buscar')} />
                }}
              /></>}
          </>
        }
      />
    </SafeAreaView>
  )
}

export default Index