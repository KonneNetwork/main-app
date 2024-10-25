import classNames from 'classnames'
import React from 'react'
import { TouchableOpacityProps, Text, TouchableOpacity } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress?: () => void;
  variant: 'active' | 'inactive' | 'exit';
  smallButton?: boolean;
  mediumButton?: boolean;
}

function Button({ title, onPress, variant, mediumButton = false, smallButton = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className={classNames('justify-center items-center', {
        'bg-[#528A8C] ': variant === 'active'
      }, {
        'border-1 border-[#222222] ': variant === 'inactive'
      },
        {
          'bg-[#EB4646] ': variant === 'exit'
        },
        { 'flex-1 py-3 rounded mt-8': mediumButton },
        { 'w-full py-6 rounded-xl mt-8': !mediumButton && !smallButton },
        { 'rounded-full px-2 py-1': smallButton }
      )}
      onPress={onPress}
      {...rest}
    >
      <Text
        className={classNames(" text-lg font-inter-500", {
          'color-[#222222]': variant === 'inactive'
        },
          {
            'color-white': variant === 'active' || variant === 'exit'
          }
        )}
      >
        {title}
      </Text>
    </TouchableOpacity >
  )
}

export default Button