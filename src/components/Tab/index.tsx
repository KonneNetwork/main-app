import classNames from 'classnames'
import React, { useState } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'


interface TabProps {
  name: string;
  isActive: boolean;
  activeAba: "konnectados" | "pedido-konnexao";
  setActiveAba: React.Dispatch<React.SetStateAction<"konnectados" | "pedido-konnexao">>
}
export default function Tab({ name, isActive, activeAba, setActiveAba }: TabProps) {
  // const [activeAba, setActiveAba] = useState<'konnectados' | 'pedido-konnexao'>('konnectados');
  return (
    <>
      <TouchableOpacity className={classNames({ 'border-b-4 border-b-[#528A8C] p-3': activeAba === "konnectados" }, {
        'border-b-1 border-b-[#E7EEF0]  p-3': activeAba === "konnectados"
      }, { 'flex-1': name === "Konnectados" }, { "w-3/5": name !== "konnectados" })} onPress={() => setActiveAba} >
        <Text className={classNames({ 'font-inter-500 text-lg color-[#000] text-center ': activeAba === "konnectados" },
          { 'font-inter-500 text-lg color-[#506773] text-center': activeAba === "konnectados" })}>
          {name}
        </Text>
      </TouchableOpacity >

      {/* <TouchableOpacity className={classNames({ 'border-b-4 border-b-[#528A8C] w-3/5 p-3': activeAba === 'pedido-konnexao' }, {
        'border-b-1 border-b-[#E7EEF0] w-3/5  p-3': activeAba !== 'pedido-konnexao'
      })} onPress={() => setActiveAba('pedido-konnexao')}>
        <Text className={classNames({ 'font-inter-500 text-lg color-[#000] text-center ': activeAba === 'pedido-konnexao' },
          { 'font-inter-500 text-lg color-[#506773] text-center': activeAba !== 'pedido-konnexao' })}>
          Pedidos de Konnexão
        </Text>
      </TouchableOpacity> */}
    </>
  )
}
