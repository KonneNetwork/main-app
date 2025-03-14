import Button from '@/components/Button'
import { Icons } from '@/components/Icons'
import InputSearch from '@/components/InputSearch'
import Ionicons from '@expo/vector-icons/Ionicons'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { usersData } from '@/mock/userData'
import Card from '@/components/Card'
import CardUsers from '@/components/CardUsers'
import { router, useFocusEffect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { userStore } from '@/store/userStore'
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Location from 'expo-location';
import useGetKonnexoes from '@/queries/konnexoes/getKonnexoes'
import { useUpdateStatusConnection } from '@/queries/konnexoes/updateStatusConnection'
import useGetUsersLocation from '@/queries/user/getUsersLocation'
import { StatusKonnexao } from '../buscar'
import FirstAccessBox from '@/components/FirstAccessBox'

function Index() {

  const [activeAba, setActiveAba] = useState<'Konnectado' | 'Pendente'>('Konnectado');
  const valorTela = false;
  const konnectionAba = activeAba === 'Konnectado';
  const [search, setSearch] = useState('')

  const { userInfo } = userStore()

  const { data: dataKonnexoes, refetch: refetchKonnexoes, isError } = useGetKonnexoes(String(userInfo?.cdUsuario));
  console.log("🚀 ~ Index ~ dataKonnexoes:", dataKonnexoes)
  const { mutate: updateStatusConnection } = useUpdateStatusConnection()

  const [konnexoes, setKonnexoes] = useState<any | undefined>()


  // const filteredData = data?.filter((user: any) => {
  //   console.log(user)
  //   const matchesKonnectado = user.status_conexao === "Pendente" ? setActiveAba('Pendente') : setActiveAba('Konnectado');
  //   // const matchesSearch = user.nome.toLowerCase().includes(search.toLowerCase());
  //   return matchesKonnectado;
  // });

  // useEffect(() => { setKonnexoes(profile?.konnexoes) }, [profile?.konnexoes])

  function Konnexoes(status: string) {
    const filterData = dataKonnexoes?.filter((user: any) => { return user?.status_conexao === status })

    console.log("🚀 ~ Konnexoes ~ filterData:", filterData)
    setKonnexoes(filterData)
  }

  function lengthPendentes() {
    const lengthPendendetes = dataKonnexoes?.filter((user: any) => { return user?.status_conexao === "Pendente" }).length
    return lengthPendendetes
  }

  useEffect(() => {
    refetchKonnexoes();
  }, [refetchKonnexoes]);

  useEffect(() => {
    if (userInfo?.cdUsuario) {
      refetchKonnexoes();
    }
  }, [userInfo]);

  useEffect(() => {
    if (dataKonnexoes) {
      Konnexoes(activeAba);
    }
  }, [activeAba, dataKonnexoes]);

  if (konnexoes && konnexoes?.length < 0 || konnexoes === undefined) {
    return (
      <View className='flex-1 bg-white p-8'>
        <View className='flex-row justify-between mt-10'>
          <Text className='font-inter-700 text-3xl '>Konnexões</Text>
          <InputSearch placeholder='Buscar' smallSearch={true} value={search} onChangeText={setSearch} />
        </View>

        <View className='flex-row justify-between mt-10'>
          <TouchableOpacity className={classNames({ 'border-b-4 border-b-[#528A8C] flex-1 p-3': activeAba === 'Konnectado' }, {
            'border-b-1 border-b-[#E7EEF0] flex-1  p-3': activeAba !== 'Konnectado'
          })} onPress={() => setActiveAba('Konnectado')}>
            <Text className={classNames({ 'font-inter-500 text-lg color-[#000] text-center': activeAba === 'Konnectado' },
              { 'font-inter-500 text-lg color-[#506773] text-center': activeAba !== 'Konnectado' })}>
              Konnectados
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className={classNames({ 'border-b-4 border-b-[#528A8C] w-3/5 p-3': activeAba === 'Pendente' }, {
            'border-b-1 border-b-[#E7EEF0] w-3/5  p-3': activeAba !== 'Pendente'
          })} onPress={() => setActiveAba('Pendente')}>
            <Text className={classNames({ 'font-inter-500 text-lg color-[#000] text-center ': activeAba === 'Pendente' },
              { 'font-inter-500 text-lg color-[#506773] text-center': activeAba !== 'Pendente' })}>
              Pedidos de Konnexão
              {/* {(lengthPendentes().length !== undefined && lengthPendentes().length > 0) && `(${lengthPendentes()})`} */}
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
                Para enviar um pedido de konnexão basta selecionar o ícone {<Ionicons name='heart' size={24} color={'#528A8C'} className='absolute mb-[-14px]' />} com quem deseja se conectar.
              </Text>
            </View>
          </View>

          <Button title='Konnectar com pessoas próximas' variant='active' onPress={() => router.navigate('/(private)/buscar')} />
        </View>

      </View >
    )
  }

  return (<>
    <FlatList
      className='flex-1 bg-surface-primary'
      data={konnexoes}
      renderItem={({ item }) => {
        return (
          <CardUsers
            aba={activeAba}
            thema={item.usuario.perfil.tema_perfil}
            image={item.usuario.perfil.foto_perfil}
            titleButtonActive={item.status_conexao === "Konnectado" ? "Mensagem" : "aceitar"}
            name={item.usuario.perfil.nome_perfil} distance={item.usuario.perfil.distancia}
            occupation={item.usuario.perfil.ocupacao}
            onChangeActive={() => {
              // konnectionAba && router.navigate({ pathname: '/(private)/(index)/chat/[id]', params: { id: item?.cd_usuario_fk.perfil } })
              updateStatusConnection({ id: item.cd_conexao, statusKonnexao: "Konnectado" })
            }}
            onChangeInactive={() => {
              updateStatusConnection({ id: item.cd_conexao, statusKonnexao: "Konnectar" })
            }}
            titleButtonInactive='recusar'
          />
        )
      }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 30,
        paddingVertical: 64

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
            <TouchableOpacity className={classNames({ 'border-b-4 border-b-[#528A8C] flex-1 p-3': activeAba === 'Konnectado' }, {
              'border-b-1 border-b-[#E7EEF0] flex-1  p-3': activeAba !== 'Konnectado'
            })} onPress={() => setActiveAba('Konnectado')}>
              <Text className={classNames({ 'font-inter-500 text-lg color-[#000] text-center ': activeAba === 'Konnectado' },
                { 'font-inter-500 text-lg color-[#506773] text-center': activeAba !== 'Konnectado' })}>
                Konnectado
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className={classNames({ 'border-b-4 border-b-[#528A8C] w-3/5 p-3': activeAba === 'Pendente' }, {
              'border-b-1 border-b-[#E7EEF0] w-3/5  p-3': activeAba !== 'Pendente'
            })} onPress={() => setActiveAba('Pendente')}>
              <Text className={classNames({ 'font-inter-500 text-lg color-[#000] text-center ': activeAba === 'Pendente' },
                { 'font-inter-500 text-lg color-[#506773] text-center': activeAba !== 'Pendente' })}>
                Pedidos de Konnexão
                {/* {(lengthPendentes().length !== undefined && Number(lengthPendentes().length) > 0) && `(${lengthPendentes()})`} */}
              </Text>
            </TouchableOpacity>
          </View>

          <Text className='font-inter-400 text-sm color-[#3C3C4399]/60 py-2'>{konnectionAba ? "Gerencie suas konnexões" : "Aceite ou rejeite pedidos de konnexões"}</Text>
        
        </>
      }

    // ListFooterComponent={
    //   <>
    //     {activeAba === 'Konnectado' && <><View className='flex-row justify-between'>
    //       <Text className='text-xl font-inter-600'>Pessoas Próximas de você</Text>
    //       <Text className='font-inter-400 color-[#528A8C] text-base'>Ver todas</Text>
    //     </View>
    //       <Text className='font-inter-400 text-sm color-[#3C3C4399]/60 py-2'>Konnexões a menos de 1 km de distância</Text>
    //       <FlatList
    //         showsHorizontalScrollIndicator={false}
    //         className='flex-grow'
    //         data={usersByNear?.filter((item: any) => item.distancia < 1000)}
    //         contentContainerStyle={{ gap: 16, flexGrow: 1 }}
    //         horizontal
    //         keyExtractor={(index) => index}
    //         renderItem={({ item }) => {
    //           // return <Card image={item.foto_perfil} key={item.documento} nome={item.nome_usuario} descricao={item.descricao} distance={item.distancia} onPress={() => router.navigate('/(private)/buscar')} />
    //           return (
    //             <View>
    //               <Text>{item.cd_usuario}</Text>
    //               <Text>{item.nome_usuario}</Text>
    //               <Text>{item.latitude}</Text>
    //               <Text>{item.longitude}</Text>
    //               <Text>{item.documento}</Text>
    //               <Text>{item.descricao}</Text>
    //               <Text>{item.ocupacao}</Text>
    //               <Text>{item.distancia}</Text>
    //               <Text>{item.status_conexao}</Text>
    //             </View>
    //           )
    //         }}
    //       /></>}
    //   </>
    // }
    />
     <FirstAccessBox open={valorTela}/>
     </>
  )
 
}

export default Index