import { create } from "zustand";
import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import { ReactNode, useEffect } from "react";
import { createJSONStorage, persist } from "zustand/middleware"
import { api } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface Coordenadas {
  latitude: number,
  longitude: number,
}

interface MediaLinks {
  label: string,
  category: string,
  link: string,
}

export interface User {
  bairro?: string | null;
  cdUsuario: string;
  cep?: string | null;
  complemento?: string | null;
  dataAtualizacao?: string | null;
  dataCriacao?: string;
  dataExclusao?: string | null;
  documento: string;
  email: string;
  estado?: string | null;
  fotoUsuario?: string | null;
  idioma?: string | null;
  integracao?: string | null;
  ipAddress?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  nome: string;
  numeroEndereco?: string | null;
  online: boolean;
  rua?: string | null;
  uuid?: string | null;
}

export interface Profile {
  cdPerfil: string;
  fotoPerfil?: string;
  idade?: string;
  descricao?: string;
  ocupacao?: string;
  nome?: string;
  temaPerfil?: string;
}

interface State {
  userInfo: User | null;
  token: string | null;
  shouldPersist: boolean;
  profile: Profile | null;
}

interface Actions {
  // login: (email: string, password: string) => void;
  setToken(token: string): void;
  setUserInfo: (userData: User) => void;
  logout: () => void;
  setShouldPersist: (shouldPersist: boolean) => void;
  setProfile: (profile: Profile) => void
  // addKonnexao: (id: string | number) => void;
  // addKonnexaoPending: (id: string | number) => void
}



export const userStore = create<State & Actions>()(
  persist((set, get) => ({
    shouldPersist: true,
    token: null,
    userInfo: null,
    profile: null,
    // login: (email, password) => {
    //   const user = usersData.find(user => {
    //     return user.email === email && user.senha === password
    //   })
    //   if (user) {
    //     set({
    //       profile: user
    //     })
    //   }

    // },
    setToken: (token: string) => {
      set({ token });
    },
    logout: () => {
      set({
        token: null
      })
    },
    setUserInfo: (userInfo: User) => {
      set({ userInfo })
    },
    setShouldPersist: (shouldPersist: boolean) => {
      set({ shouldPersist });
    },
    setProfile: (profile: Profile) => {
      set({ profile })
    }

    // addKonnexaoPending: (id) => set((state) => {
    //   if (state.profile) {
    //     const updatedFriends = state.profile.konnexoes.includes(id)
    //       ? state.profile.konnexoes
    //       : [...state.profile.konnexoes, id];

    //     return {
    //       profile: {
    //         ...state.profile,
    //         konnexoes: updatedFriends,
    //       },
    //     };
    //   }
    //   return {};
    // }),

    // addKonnexao: (id) => set((state) => {
    //   if (state.profile) {
    //     const updatedFriends = state.profile.konnexoes.includes(id)
    //       ? state.profile.konnexoes
    //       : [...state.profile.konnexoes, id];

    //     return {
    //       profile: {
    //         ...state.profile,
    //         konnexoes: updatedFriends,
    //       },
    //     };
    //   }
    //   return {};
    // }
    // ),
  }), {
    name: 'userStore',
    storage: createJSONStorage(() => AsyncStorage),
    partialize: (state) => ({
      ...state,
      token: state.shouldPersist ? state.token : null,
      userInfo: null,
      shouldPersist: true,
    })
  }),
);



export function UserProvider({ children }: { children: ReactNode }) {
  const segments = useSegments();

  const router = useRouter();
  const token = userStore((state) => state.token);

  const rootNavigationState = useRootNavigationState();



  useEffect(() => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    if (!rootNavigationState?.key) return;
    const inPublicGroup = segments[0] === '(public)';
    if (!token && !inPublicGroup) {
      router.replace('/(public)');
    } else if (token && inPublicGroup) {
      router.replace('/(private)/')
    }
  }, [token, router, rootNavigationState?.key]);

  return children;
}
