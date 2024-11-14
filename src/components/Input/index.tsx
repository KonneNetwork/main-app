import React, { useRef, useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, TextInputProps, Animated, StyleSheet, StyleProp, ViewStyle, Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import classNames from 'classnames';


interface InputProps extends TextInputProps {
  value?: string | undefined;
  label: string;
  password?: boolean;
  templateWhite?: boolean;
  variant?: 'default' | 'white';
  styleContainer?: StyleProp<ViewStyle>;
  styleInput?: StyleProp<TextInputProps>;
  error?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
}

function Input({ label, password = false, variant = 'default', styleContainer, styleInput, value, ...rest }: InputProps) {
  const [visiblePassword, setVisiblePassword] = useState(true)
  const inputRef = useRef<TextInput | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  function handleVisiblePassword() {
    setVisiblePassword(!visiblePassword)
  }

  const moveText = useRef(new Animated.Value(value ? 1 : 0)).current
  const [val, setVal] = useState(value ? value : '')


  const moveToTop = () => {
    setIsFocused(true);
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  }

  const moveToBottom = () => {
    setIsFocused(false);
    Animated.timing(moveText, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true
    }).start();
  }


  const onChangeText = (text: string) => {
    setVal(text);
    rest.onChangeText ? rest.onChangeText(text) : () => { };
  };
  const onFocusHandler = () => {
    moveToTop();
    rest?.onFocus ? rest?.onFocus() : () => { };
  };

  const onBlurHandler = () => {
    if (!val) {
      moveToBottom();
    }
    setIsFocused(false);
    rest?.onBlur ? rest?.onBlur() : () => { };
  };

  const YMove = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [27, 1],
  })

  const animStyle = {
    transform: [
      {
        translateY: YMove,

      },

    ]
  }



  return (
    <View
      className={classNames(' mt-5 mb-2 border-2 rounded-xl bg-white/30 min-w-max -z-10', {
        'border-white/30': !isFocused && variant === 'white',    // Aplica cor branca quando não focado e variante é branca
        'border-[#506773]/30': !isFocused && variant === 'default', // Aplica cor padrão quando não focado
        'border-[#528A8C]': isFocused, // Aplica a cor de foco somente quando o input está focado
      })}

      style={styleContainer}
      ref={inputRef}
    >
      <Animated.View style={[animStyle]}
        className={classNames('absolute top-[-14px] left-[15px] px-2 -z-10 rounded-lg', {
          'bg-white': variant === 'default',
          'bg-background': isFocused
        })}
      >
        <Text
          className={classNames('text-base', {
            'color-white': variant === 'white'
          },
            {
              'color-[#506773]': variant === 'default'
            },
            {
              'color-[#528A8C]': isFocused
            }
          )}
        >
          {label}
        </Text>
      </Animated.View>
      <View className='flex-row items-center w-full min-h-14 justify-around'>
        <TextInput
          ref={inputRef}
          style={styleInput}
          autoCapitalize={'none'}
          className={classNames(' color-black w-[85%] text-lg font-inter-400 min-h-14',
            {
              'w-full': !password
            },
            {
              'p-2': Platform.OS === "android"
            },
            {
              'px-2 pb-2': Platform.OS === "ios"
            },
            {
              'color-white': variant === 'white'
            }
          )}
          secureTextEntry={(password && visiblePassword) && visiblePassword}
          {...rest}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onChangeText={text => onChangeText(text)}
        />
        {password &&
          <TouchableOpacity onPress={handleVisiblePassword}>
            <Ionicons
              name={visiblePassword ? "eye" : "eye-off-sharp"}
              size={26}
              color="white"

            />
          </TouchableOpacity>

        }
      </View>
    </View>
  );
}

export default Input

const styles = StyleSheet.create({
  animatedStyled: {
    left: 15,
    position: 'absolute',
    borderRadius: 5,
    zIndex: 1,

  }
})