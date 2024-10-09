import React, { useRef, useState } from 'react'
import { TextInput, View, Text, TouchableOpacity, TextInputProps, Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import classNames from 'classnames';


interface InputProps extends TextInputProps {
  label: string;
  password?: boolean;
  templateWhite?: boolean;
  style?: any
  error?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
}

function Input({ label, password = false, templateWhite = false, style, ...rest }: InputProps) {
  const [visiblePassword, setVisiblePassword] = useState(true)
  const inputRef = useRef<TextInput | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  function handleVisiblePassword() {
    setVisiblePassword(!visiblePassword)
  }

  const moveText = useRef(new Animated.Value(rest.value ? 1 : 0)).current
  const [val, setVal] = useState(rest.value ? rest.value : '')


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
      className={classNames(' mt-5 mb-2 border-2 bg-white/30 rounded-xl min-w-max -z-10', {
        'border-white/30': templateWhite,
        'border-[#506773]': !templateWhite,
        'border-[#528A8C]': isFocused
      })}
      style={style}
      ref={inputRef}
    >
      <Animated.View style={[animStyle]}
        className={classNames('absolute top-[-14px] left-[15px] px-2 bg-blend-screenz-10 rounded-lg', {
          'bg-white': !templateWhite,
          'bg-background': isFocused
        })}
      >
        <Text
          className={classNames('text-base', {
            'color-white': templateWhite
          })}
        >
          {label}
        </Text>
      </Animated.View>
      <View className='flex-row items-center w-full min-h-14 justify-around'>
        <TextInput
          ref={inputRef}
          className={classNames(' color-black  w-[85%]',
            {
              'w-full p-2': !password
            },
            {
              'color-white': templateWhite
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