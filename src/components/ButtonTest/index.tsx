import classNames from 'classnames'
import React, { useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'

interface ButtonTesteProps {
  id: number;
  title: string;
  selectTheme: (title: string, setValue: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => void
  isSelected: boolean
}

export default function ButtonTeste({ id, title, selectTheme, isSelected }: ButtonTesteProps) {
  const [select, setSelect] = useState(false)
  return (<TouchableOpacity
    key={id}
    className={
      classNames(' my-2 justify-center items-center p-6 rounded-xl ',
        {
          "bg-surface-brand-main-selected border-2 border-surface-brand-main-selected": select || isSelected
        }, {
        'border-2 border-[#528A8C] bg-[#EEEEEE]': !select
      })
    }
    onPress={() => selectTheme(title, setSelect, select)}>
    <Text className={classNames('color-[#528A8C] font-outfit-600 text-lg', {
      'color-white': select
    }, {
      'color-[#528A8C]': !select
    })}>{title}</Text>
  </TouchableOpacity>

  )
}
