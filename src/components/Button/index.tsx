import classNames from 'classnames'
import React from 'react'
import { TouchableOpacityProps, Text, TouchableOpacity } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress?: () => void;
  variant: 'active' | 'inactive';
  adaptative?: boolean;
}

function Button({ title, onPress, variant, adaptative, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className={classNames('justify-center items-center mt-8', {
        'bg-[#528A8C] ': variant === 'active'
      }, {
        'border-1 border-[#222222] ': variant === 'inactive'
      },
        { 'flex-1 py-3 rounded': adaptative },
        { 'w-full py-6 rounded-xl': !adaptative }
      )}
      onPress={onPress}
      {...rest}
    >
      <Text
        className={classNames(" text-lg font-inter-500", {
          'color-[#222222]': variant === 'inactive'
        },
          {
            'color-white': variant === 'active'
          }
        )}
      >
        {title}
      </Text>
    </TouchableOpacity >
  )
}

export default Button