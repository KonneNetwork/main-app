import { create } from "zustand";
import { usersData } from "@/mock/userData";
import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import { ReactNode, useEffect } from "react";
import { View } from "react-native";
import { persist } from "zustand/middleware"
import { api } from "@/services/api";


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


interface State {
  userInfo: User | null;
  token: string | null;
}

interface Actions {
  // login: (email: string, password: string) => void;
  setToken(token: string): void;
  setUserInfo: (userData: User) => void;
  logout: () => void;
  // addKonnexao: (id: string | number) => void;
  // addKonnexaoPending: (id: string | number) => void
}



export const userStore = create<State & Actions>(
  (set, get) =>
  (
    {
      token: null,
      userInfo: null,
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
          token:null
        })
      },
      setUserInfo:(userInfo:User)=>{
        set({userInfo})
    },

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
    }
  )
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
