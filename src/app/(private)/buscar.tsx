import React, { useEffect, useState, useCallback, useMemo, useLayoutEffect } from 'react';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Image, Modal, TouchableWithoutFeedback, TextInput, FlatList } from 'react-native';
import * as Location from 'expo-location';
import { usersData } from '@/mock/userData';
import { generateNearbyCoordinates } from '@/utils/distancesRandom';
import { userStore } from '@/store/userStore';
import InputImage from '@/components/InputImage';
import { LinearGradient } from 'expo-linear-gradient';
import { Icons } from '@/components/Icons';
import { StatusBar } from 'expo-status-bar';
import { router, useNavigation } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CommonActions, StackActions } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import useGetUsersLocation from '@/queries/user/getUsersLocation';
import InviteModelBox from '@/components/InviteModelBox';

export interface LatLog {
  latitude: number;
  longitude: number;
}

interface User {
  id: number;
  nome: string;
  idade: number;
  cpf: string;
  rg: string;
  email: string;
  senha: string;
  celular: string;
  ocupacao: string;
  distancia: number;
  descricao: string;
  links: SocialMediaLink[];
  konnectado: boolean;
  image: string;
  colorTheme: string;
  coordenadas: LatLog;
}

interface SocialMediaLink {
  label: string;
  link: string;
}

interface Coordenadas {
  latitude: number;
  longitude: number;
}

interface UsersFetch {
  cd_perfil: string;
  foto_perfil: any;
  cd_usuario: string,
  latitude: string,
  longitude: string,
  nome_usuario: string,
  distancia: string,
}

// Tipagem das props do MarkerComponent
interface MarkerComponentProps {
  item: User & { coordinates: ColorGamut };
  onPress: (user: User) => void;
}

function Buscar() {
  const [userLocation, setUserLocation] = useState<LatLog
  >({
    latitude: -23.53474453844267,
    longitude: -46.73403872474612
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [openModal, setOpenModal] = useState(false)
  const [openInvite, setOpenInvite] = useState(false)
  const [openPerfil, setOpenPerfil] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [enableLinks, setEnableLinks] = useState(false)
  const { profile } = userStore()
  const { data } = useGetUsersLocation({ latitude: userLocation.latitude, longitude: userLocation.longitude })
  const [markers, setMarkers] = useState(usersData);
  const [markers2, setMarkers2] = useState<UsersFetch[] | undefined>([]);
  const navigation = useNavigation();


  async function PermissionLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('A permissão para acessar a localização foi negada!');
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest
    });
    setUserLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
  }

  useEffect(() => {
    PermissionLocation();
  }, []);

  // const handleMarkerPress = useCallback((user: User) => {
  //   setSelectedUser(user);
  //   setOpenInvite(true);
  // }, []);

  // const MarkerComponent = useMemo(() => React.memo(({ item, onPress }: { item: User; onPress: () => void }) => (
  //   <Marker
  //     coordinate={item.coordenadas}
  //     onPress={() => handleMarkerPress(item)}
  //   >
  //     <TouchableOpacity>
  //       <View style={styles.marker}>
  //         <Image style={styles.image} source={{ uri: item.image }} />
  //       </View>
  //     </TouchableOpacity>
  //   </Marker>
  // )), [handleMarkerPress]);

  // function handleAddKonnection(id: number | undefined) {
  //   if (id) {
  //     addKonnexao(id);
  //   }
  //   setEnableLinks(true);
  // }

  function handleAddKonnectionPending() {
    setOpenInvite(false); setOpenPerfil(true); setEnableLinks(false)
  }

  useLayoutEffect(() => {
    if (userLocation) {
      setMarkers(usersData.map((user) => ({
        ...user,
        coordenadas: generateNearbyCoordinates(userLocation),
      })));
    }
  }, [userLocation])

  const handleResetAction = () => {
    navigation.dispatch(CommonActions.reset({
      routes: [{ key: "(tabs)", name: "(tabs)" }]
    }))
  }

  function goBack() {
    const rota = navigation.canGoBack();
    const saida = navigation.dispatch(StackActions.pop(1))
  }

  useEffect(() => {
    if (userLocation) {
      setMarkers(usersData.map((user) => ({
        ...user,
        coordenadas: generateNearbyCoordinates(userLocation),
      })));
    }
  }, [userLocation]);

  useEffect(() => {
    console.log("🚀 ~ Buscar ~ data:", data)
    setMarkers2(data)
  }, [data])

  // if (errorMsg) {
  //   return (
  //     <View style={styles.center}>
  //       <Text>{errorMsg}</Text>
  //     </View>
  //   );
  // }

  // if (!userLocation) {
  //   return (
  //     <View style={styles.center}>
  //       <ActivityIndicator size="large" color="#33586C" />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <View className=' flex-row absolute items-center top-16 w-[90%] justify-between gap-5 bg-surface-primary z-10 self-center p-1 rounded-full'>
        <Ionicons name="arrow-back-sharp" size={32} color="black" className='ml-3' onPress={() => router.navigate('/(private)/(index)/')} />
        <TextInput className='flex-1 font-inter-700 text-base ' placeholder='Coloque o endereço' />
        {/* <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(data: any, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: process.env.GOOGLE_API_KEY,
            language: 'pt-br',
          }}
        /> */}
        <TouchableOpacity className='bg-[#528A8C]/30 p-2 rounded-full'>
          <Icons.filter width={32} height={32} />
        </TouchableOpacity>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ width: '100%', height: '100%' }}
        region={{
          //-23.53474453844267, -46.73403872474612
          latitude: userLocation?.latitude ? userLocation.latitude : -23.53474453844267,
          longitude: userLocation?.longitude ? userLocation?.longitude : -46.73403872474612,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        zoomEnabled

      >
        {/* {markers.map((item, index) => (
          <MarkerComponent key={index} item={item} onPress={() => handleMarkerPress} />
        ))} */}

        {markers2?.map((item) => (
          <Marker key={item.cd_usuario}
            coordinate={{ latitude: Number(item.latitude), longitude: Number(item.longitude) }}
            // onPress={() => handleMarkerPress(item)}
            onPress={() => {
              setOpenInvite(true);
              setSelectedUser(item?.cd_perfil ?? "")
            }}
          >
            <TouchableOpacity>
              {item?.foto_perfil == "" || item?.foto_perfil == undefined ? <View style={styles.marker}>
                <Icons.user width={30} height={30} color={'#528A8C'} />
              </View> :
                <View style={styles.marker}>
                  <Image style={styles.image} source={{ uri: item?.foto_perfil }} resizeMode='stretch' />
                </View>}
            </TouchableOpacity>
          </Marker>
        ))}


        <Circle
          center={userLocation}
          radius={100}
          strokeColor="rgba(51, 88, 108, 0.4)"
          fillColor="rgba(51, 88, 108, 0.4)"
        />

        <Marker coordinate={userLocation} onPress={() => router.navigate('/(perfil)/')}>
          {profile?.fotoPerfil == "" || profile?.fotoPerfil == undefined ? <View className='bg-white rounded-full overflow-hidden border-[16px] border-[#33586C]'>
            <Icons.user className='w-28 h-28' color={'#528A8C'} />
          </View> : <View className='bg-white rounded-full overflow-hidden border-[16px] border-[#33586C]'>
            <Image
              source={{ uri: profile?.fotoPerfil }}
              className='w-28 h-28'
            />
          </View>}
        </Marker>
      </MapView>

      <InviteModelBox invite={openInvite} setInvite={setOpenInvite} userCode={selectedUser} />



      <Modal
        visible={openPerfil}
        transparent={true}
        presentationStyle='overFullScreen'
        animationType='fade'
        style={{ backgroundColor: '#000', flex: 1 }} >

        <View style={{ flex: 1 }}>

          <TouchableWithoutFeedback onPress={() => setOpenPerfil(false)}><View className='w-full h-full' /></TouchableWithoutFeedback>

          <View className='w-full h-[80%]  absolute bottom-0' >
            {enableLinks && <TouchableOpacity
              style={{ backgroundColor: "#ffffff4f" }}
              className=' absolute p-3 top-0 right-0 rounded-xl m-8 z-10'>
              <Icons.heart color={'#528A8C'} width={30} height={30} />
            </TouchableOpacity>}

            <LinearGradient locations={[0, 0.2, 0.8, 1]}
              colors={['#ffffff77', '#4f8f90', '#005c61', '#006560']}
              style={{ position: 'relative', overflow: 'visible', flex: 1, width: '100%', justifyContent: 'center', alignContent: 'center', gap: 40, paddingHorizontal: 30, borderTopRightRadius: 40, borderTopLeftRadius: 40 }}  >
              <View className='justify-center items-center absolute  top-[-70] self-center z-10'>
                <InputImage image={selectedUser?.image} isEdit={true} />
                <View className=' gap-2 m-4 items-center'>
                  <Text className='font-inter-500 text-3xl color-white'>{selectedUser?.nome}</Text>
                  <Text className='font-inter-400 text-sm color-white'>{selectedUser?.ocupacao}</Text>
                </View>
              </View>

              {/* <View className='bg-black/20 p-5 rounded-3xl mt-16'>
                <Text className='color-[#FFFFFF] font-inter-500'>Sobre {selectedUser?.nome.split(" ").slice(0, 1).join("")}</Text>
                <TextInput
                  editable={false}
                  multiline
                  value={selectedUser?.descricao?.length! > 150
                    ? `${selectedUser?.descricao.substring(0, 147)}...`
                    : selectedUser?.descricao}
                  className="color-[#FFFFFFAD] font-inter-400"
                />

              </View> */}
              {!enableLinks ? <View className='items-center gap-4'>
                {/* <Text className='font-inter-500 text-base color-white'>
                  {selectedUser?.nome.split(" ").slice(0, 1).join("")} fez um pedido de Konnexão
                </Text> */}

                {/* <TouchableOpacity className='flex-row  items-center gap-3 bg-surface-brand-main-default p-5  justify-center w-full rounded-md '
                // onPress={() => handleAddKonnection(selectedUser?.id)}
                >
                  <Icons.heart color={"#fcf9f967"} />
                  <View className='flex-row gap-2'>
                    <Text className='font-inter-500 text-xl color-white'>Aceitar</Text>
                    <Text className='font-inter-700 text-xl color-white'>Konnexão</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity className='flex-row  items-center gap-3 border-2 border-[#528A8C] p-5  justify-center w-full rounded-md '
                  onPress={() => setOpenPerfil(false)}
                >
                  <Text className='font-inter-500 text-xl color-white'>Recusar Pedido</Text>

                </TouchableOpacity> */}
                <Text className='font-inter-500 text-2xl color-white text-center'>Aguardando {selectedUser?.nome} aceitar sua solicitação</Text>

                <TouchableOpacity className='flex-row  items-center gap-3 border-2 border-[#528A8C] p-5  justify-center w-full rounded-md '
                  onPress={() => setOpenPerfil(false)}
                >
                  <Text className='font-inter-500 text-xl color-white mt-2'>Voltar</Text>

                </TouchableOpacity>

              </View>
                :
                <View className='gap-2'>
                  <Text className='font-inter-500 text-base color-white'>
                    Links {selectedUser?.nome.split(" ").slice(0, 1).join("")}
                  </Text>

                  <FlatList
                    className='w-full'
                    horizontal
                    contentContainerStyle={{
                      gap: 30,
                      justifyContent: 'space-between',


                    }}
                    data={selectedUser?.links} renderItem={({ item }) => {
                      return (<TouchableOpacity style={{ backgroundColor: '#ffffff3f' }} className='rounded-lg p-3 justify-center items-center'>
                        {item.label === "Instagram" && <Icons.instagram />}
                        {item.label === "Email" && <Icons.email />}
                        {item.label === "WhatsApp" && <Icons.whatsapp />}


                        <Text className='font-inter-500'>{item.label}</Text>
                      </TouchableOpacity>)
                    }
                    } />

                </View>
              }

            </LinearGradient>
          </View>
        </View >

      </Modal >
    </View >

  );
}

export default Buscar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#528A8C',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
  },
});
