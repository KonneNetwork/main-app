import React from 'react'
import { View } from 'react-native'

interface Props {
  children: React.JSX.Element;
  focused: boolean;
  color: string;
}

function TabBarIcon
  ({ children, focused, color }: Props) {
  return (
    <View className="justify-between items-center flex-1 w-full  ">
      {focused && <View className="h-[4px] w-14 rounded-b-3xl absolute top-0" style={{ backgroundColor: `${color}` }} />}
      <View className="flex-1 justify-center items-center m-4">
        {children}

      </View>

    </View>
  )
}

export default TabBarIcon
