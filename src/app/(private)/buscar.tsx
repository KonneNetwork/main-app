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
import useUpdateUserInfo from '@/queries/user/updateUser';
import SearchFilter from '@/components/SearchFilter';

interface LatLog {
  latitude: number;
  longitude: number;
}

export enum StatusKonnexao {
  Konnectado,
  Pendente,
  Konnectar,
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
  status_conexao: StatusKonnexao | null
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
  const [open, setOpen] = useState(false)
  const [openInvite, setOpenInvite] = useState(false)
  const [statuskonexao, setstatuskonexao] = useState<StatusKonnexao | null>(null)
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { profile, userInfo } = userStore()
  const { mutate: updateUserInfo } = useUpdateUserInfo()
  const { data } = useGetUsersLocation({ id: userInfo?.cdUsuario, latitude: userLocation.latitude, longitude: userLocation.longitude })
  const [markers, setMarkers] = useState<UsersFetch[] | undefined>([]);


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

  // useMemo(() => { setMarkers(data) }, [data])

  useEffect(() => {
    console.log("🚀 ~ Buscar ~ data:", data)
    setMarkers(data)
  }, [data])

  useEffect(() => {
    updateUserInfo({ id: userInfo?.cdUsuario, data: { latitude: userLocation.latitude ?? null, longitude: userLocation.longitude ?? null } })
  }, [userLocation])


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
        <TouchableOpacity className='bg-[#528A8C]/30 p-2 rounded-full' onPress={() => setOpen(true)}>
          <Icons.filter width={32} height={32} />
        </TouchableOpacity>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ width: '100%', height: '100%' }}
        region={{
          latitude: userLocation?.latitude ? userLocation.latitude : -23.53474453844267,
          longitude: userLocation?.longitude ? userLocation?.longitude : -46.73403872474612,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        zoomEnabled

      >


        {markers?.map((item) => (
          <Marker key={item.cd_usuario}
            coordinate={{ latitude: Number(item.latitude), longitude: Number(item.longitude) }}
            onPress={() => {
              setOpenInvite(true);
              setSelectedUser(item?.cd_perfil ?? "")
              setstatuskonexao(item?.status_conexao ?? null)
            }}
          >
            <TouchableOpacity>
              {item?.foto_perfil == "" ? <View style={styles.marker}>
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
          {profile?.fotoPerfil && <View className='rounded-full overflow-hidden border-[16px] border-[#33586C]'>
            <Image
              source={{ uri: profile?.fotoPerfil }}
              className='w-28 h-28'
            />
          </View>}
        </Marker>
      </MapView>

      <InviteModelBox invite={openInvite} setInvite={setOpenInvite} userCode={selectedUser} statusKonnexao={statuskonexao} />
      <SearchFilter setUsersLocation={setMarkers} id={userInfo?.cdUsuario} latitude={userLocation.latitude} longitude={userLocation.longitude} open={open} setOpen={setOpen} />
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