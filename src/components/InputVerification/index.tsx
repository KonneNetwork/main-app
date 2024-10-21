import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface CodeInputProps extends TextInputProps {
  setCodeNumber: React.Dispatch<React.SetStateAction<string>>
}

export default function VerificationCodeInput({ setCodeNumber, ...rest }: CodeInputProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']); // Array para armazenar os 6 dígitos
  const inputs = useRef<any>([]); // Referências para os inputs
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleChangeText = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;

    setCode(newCode);

    // Mover automaticamente para o próximo input se o usuário digitar
    if (text && index < 7) {
      inputs?.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Se o usuário pressionar Backspace e o campo estiver vazio, focar no anterior
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputs?.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    setCodeNumber(code.join(''));
  }, [code])

  return (
    <View style={styles.container}>
      <View style={styles.codeInputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            style={[
              styles.input,
              focusedIndex === index && styles.inputFocused, // Aplica o estilo de borda diferente ao input focado
            ]}
            keyboardType="numeric"
            maxLength={1} // Limita a entrada para 1 dígito por input
            ref={(input) => (inputs.current[index] = input)} // Salva a referência de cada input
            onFocus={() => setFocusedIndex(index)} // Define o índice focado
            onBlur={() => setFocusedIndex(null)} // Reseta o índice ao perder o focoa
            {...rest}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    width: 48,
    height: 56,
    textAlign: 'center',
    fontSize: 24,
    color: '#528A8C'
  },
  inputFocused: {
    borderColor: '#528A8C', // Cor da borda do input focado
  },
});
