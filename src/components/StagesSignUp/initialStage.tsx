import { View, Text, TouchableOpacity } from "react-native";
import Input from "../Input";
import Button from "../Button";
import { z } from "zod"
import { useForm, Controller } from "react-hook-form";
import { useSendMessage } from "@/queries/signUp/sendMessageCod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

const schema = z.object({
  codCountry: z.string().max(4, { message: "código do pais está incorreto" }),
  phoneNumber: z.string().min(11, { message: "número de celular incorreto" }),
}).required();

type PhoneSchema = z.infer<typeof schema>

interface PropsPhone {
  setStage: React.Dispatch<React.SetStateAction<"phone" | "cod" | "sign-up">>
  setPhoneNumber: React.Dispatch<React.SetStateAction<string | undefined>>
  onClose: () => void
}

export function InitialStage({ setStage, setPhoneNumber, onClose }: PropsPhone) {
  const { t } = useTranslation("translation", { keyPrefix: "SignUp" })
  const { mutate: sendMessage, isPending } = useSendMessage({ onChange });
  const { control, handleSubmit, formState: { errors }, getValues, } = useForm({
    defaultValues: {
      codCountry: "",
      phoneNumber: "",
    },
    resolver: zodResolver(schema)
  })
  const { codCountry, phoneNumber } = getValues();

  function onChange() {
    setPhoneNumber(codCountry + phoneNumber)
    setStage("cod")
  }

  const onSubmit = (data: PhoneSchema) => {
    console.log("Passou aqui", data)
    sendMessage(data)
  }

  return (
    <View className='flex-1 justify-between'>
      <View>
        <View className="flex-row gap-3 mt-6 ">
          <Controller control={control} name='codCountry' render={({ field: { onChange, value, onBlur } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              label={t('country cod')}
              styleContainer={{ width: '25%' }} styleInput={{ textAlign: 'center' }}
              keyboardType='phone-pad'
              errorShowOutSide={errors.codCountry}
            />
          )} />

          <Controller control={control} name='phoneNumber' render={({ field: { onChange, value, onBlur } }) => (
            <Input

              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              label={t('phone')}
              styleContainer={{ width: '72%' }}
              keyboardType='phone-pad'
              errorShowOutSide={errors.phoneNumber}
            />
          )} />

        </View>
        {errors.codCountry && <Text className="color-red-700 text-right">{errors.codCountry?.message}</Text> ||
          errors.phoneNumber && <Text className="color-red-700 text-right">{errors.phoneNumber?.message}</Text>}
        <Text className='w-full font-inter-400 text-base color-[#506773]'>{t('warning message')}</Text>
        <Button loading={isPending} variant='active' title={t('send')} onPress={handleSubmit(onSubmit)} />
      </View>

      <View className='self-center flex-row gap-2'>
        <Text className='color-[#506773]'>
          {t('have account')}
        </Text>
        <TouchableOpacity onPress={onClose}>
          <Text>{t('sign in')}</Text>
        </TouchableOpacity>

      </View>


    </View>
  )
}