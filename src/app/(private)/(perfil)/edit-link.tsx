import Button from '@/components/Button'
import { Icons } from '@/components/Icons';
import InputPerfil from '@/components/InputPerfil'
import { useDeleteMidiaLinks } from '@/queries/Profile/deleteMidiaLinks';
import { useUpdateMidiaLinks } from '@/queries/Profile/updataMidiaLinks';
import { userStore } from '@/store/userStore';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { z } from 'zod';

interface EditLinkProps {
  onClosed: () => void;
  linkEdit: any | { label: string, link: string, category: string } | null;
}

const schema = z.object({
  url: z.string(),
})

export default function EditLink({ onClosed, linkEdit }: EditLinkProps) {
  const { profile } = userStore()
  const { midia } = linkEdit.cd_social_midia_fk
  const { mutate: updateMidiaLinks } = useUpdateMidiaLinks(linkEdit?.cd_social_midia_link || "", profile?.cdPerfil || "", onClosed)
  const { mutate: deleteMidiaLinks } = useDeleteMidiaLinks(profile?.cdPerfil || '', onClosed)
  const name = midia.toLowerCase().toString().replace(" ", '')
  const Icon = Icons[name as keyof typeof Icons];
  // const [link, setLink] = useState(linkEdit?.url)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      url: linkEdit?.url || ""
    },
    resolver: zodResolver(schema)
  })

  function deleteMidiaLink() {
    deleteMidiaLinks(linkEdit.cd_social_midia_link)
  }


  function onSubmit(data: { url: string }) {
    updateMidiaLinks(data)
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
          <Controller
            name='url'
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputPerfil
                isEditable={true}
                label={midia === "Telefone" ? 'Contato' : 'Usuário'}
                placeholder={midia === "Telefone" ? 'número' : 'link'}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType={midia === "Telefone" ? 'number-pad' : 'default'}
              />
            )} />



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
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
