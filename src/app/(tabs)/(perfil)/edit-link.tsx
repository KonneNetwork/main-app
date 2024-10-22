import Button from '@/components/Button'
import InputPerfil from '@/components/InputPerfil'
import React from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'

interface EditLinkProps {
  onClosed: () => void;
}

export default function EditLink({ onClosed }: EditLinkProps) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }} showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps="handled">

        <View className='  w-full items-center gap-2 bg-surface-primary pt-8 px-8 pb-4 rounded-t-[30px]'>


          <InputPerfil
            isEditable={true}
            label='Profissão'
            placeholder='Sua Profissão'
          />


          <View className='flex-row gap-3 w-full'>
            <Button
              variant='inactive'
              title=' Cancelar'
              mediumButton={true}
              onPress={onClosed}
            />
            <Button
              variant='active'
              title=' Salvar'
              mediumButton={true}
              onPress={onClosed}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
