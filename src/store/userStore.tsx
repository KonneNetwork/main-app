import { create } from "zustand";
import { usersData } from "@/mock/userData";
import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import { ReactNode, useEffect } from "react";
import { View } from "react-native";


interface Coordenadas {
  latitude: number,
  longitude: number,
}

interface MediaLinks {
  label: string,
  link: string,
}

interface UserInfo {

  id: number | string,
  nome: string,
  idade: number,
  cpf: string,
  rg: string,
  email: string,
  senha: string,
  celular: string,
  ocupacao: string,
  distancia: number,
  descricao: string,
  links: MediaLinks[],
  konnectado: boolean,
  image: string,
  colorTheme: string,
  coordenadas: Coordenadas,
  konnexoes: any[]
  pendKonnection: boolean,
}

interface State {
  profile: UserInfo | null;
}

interface Actions {
  login: (email: string, password: string) => void,
  logout: () => void,
  addKonnexao: (id: string | number) => void,
  // addKonnexaoPending: (id: string | number) => void
}

export const userStore = create<State & Actions>((set) => ({
  profile: null,
  login: (email, password) => {
    const user = usersData.find(user => {
      return user.email === email && user.senha === password
    })
    if (user) {
      set({
        profile: user
      })
    }

  },
  logout: () => {
    set({
      profile: null
    })
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

  addKonnexao: (id) => set((state) => {
    if (state.profile) {
      const updatedFriends = state.profile.konnexoes.includes(id)
        ? state.profile.konnexoes
        : [...state.profile.konnexoes, id];

      return {
        profile: {
          ...state.profile,
          konnexoes: updatedFriends,
        },
      };
    }
    return {};
  }),
}));



export function UserProvider({ children }: { children: ReactNode }) {
  const segments = useSegments();

  const router = useRouter();
  const profile = userStore((state) => state.profile);

  const rootNavigationState = useRootNavigationState();


  useEffect(() => {
    if (!rootNavigationState?.key) return;
    const inPublicGroup = segments[0] === '(public)';
    if (!profile && !inPublicGroup) {
      router.replace('/(public)');
    } else if (profile && inPublicGroup) {
      router.replace('/(private)/')
    }
  }, [profile, router, rootNavigationState?.key]);

  return children;
}
