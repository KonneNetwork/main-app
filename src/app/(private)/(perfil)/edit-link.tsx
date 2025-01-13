import Button from '@/components/Button'
import { Icons } from '@/components/Icons';
import InputPerfil from '@/components/InputPerfil'
import { useDeleteMidiaLinks } from '@/queries/Profile/deleteMidiaLinks';
import React, { useEffect, useState } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'

interface EditLinkProps {
  onClosed: () => void;
  linkEdit: any | { label: string, link: string, category: string } | null;
  remove: (link: string) => void;
}

export default function EditLink({ onClosed, linkEdit, remove }: EditLinkProps) {
  console.info("🚀 ~ EditLink ~ linkEdit:", linkEdit)
  const { midia } = linkEdit.cd_social_midia_fk
  const [link, setLink] = useState(linkEdit?.link)
  const { mutate: deleteMidiaLinks } = useDeleteMidiaLinks()
  const name = midia.toLowerCase().toString().replace(" ", '')
  const Icon = Icons[name as keyof typeof Icons];

  function deleteMidiaLink() {
    deleteMidiaLinks(linkEdit.cd_social_midia_link)
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }} showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps="handled">

        <View className='  w-full items-center gap-2 bg-surface-primary pt-8 px-8 pb-4 rounded-t-[30px]'>
          <Icons.trash width={23} height={23} style={{ position: 'absolute', right: 30, top: 30 }} onPress={deleteMidiaLink} />
          <Icon width={150} height={150} />
          <Text className='font-roboto-700 text-xl mb-3'>{midia}</Text>
          <InputPerfil
            isEditable={true}
            label='Usuário'
            placeholder='link'
            value={link}
            onChangeText={setLink}
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
