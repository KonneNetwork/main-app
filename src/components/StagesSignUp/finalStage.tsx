import { View, Text, TouchableOpacity } from "react-native"
import Input from "../Input"
import Button from "../Button"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUser } from "@/queries/signUp/createUser";
import { useTranslation } from "react-i18next";

const schema = z.object({
  name: z.string(),
  email: z.string().email('email inválido.'),
  cpf: z.string().min(11, "CPF inválido.").max(11, "CPF inválido."),
  passwd: z.string().min(6, "minimo de 6 caracteres."),
})

type SignUpSchema = z.infer<typeof schema>

interface FinalStageProps {
  onClose: () => void
}

export function FinalStage({ onClose }: FinalStageProps) {
  const { t } = useTranslation("translation", { keyPrefix: "SignUp" })
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      passwd: "",
    },
    resolver: zodResolver(schema)
  })
  const { mutate: createUser, isPending } = useCreateUser({ onClose })

  function onSubmit(data: SignUpSchema) {
    createUser(data);

  }


  return (
    <View className='flex-1 justify-between'>

      <View className=" mt-9 ">
        <Controller
          name="name"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              label={t('full name')}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              errorShowInSide={errors.name}
              autoCapitalize='words'
            />

          )} />
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input label='E-mail'
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              errorShowInSide={errors.email}
            />

          )} />

        <Controller
          name="cpf"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input label='CPF' keyboardType='number-pad'
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              errorShowInSide={errors.cpf}
            />
          )} />
        <Controller
          name="passwd"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input label={t('set passwd')}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              errorShowInSide={errors.passwd}
            />

          )} />
        <Button loading={isPending} variant='active' title={t('end sign up')} onPress={handleSubmit(onSubmit)} />
      </View>



      <View className='self-center  mt-9 items-center'>
        <Text className='color-[#506773]'>
          {t('agreement message')}
        </Text>
        <View className='self-center flex-row items-center'>
          <TouchableOpacity onPress={() => { }}>
            <Text>{t('terms uses')}</Text>
          </TouchableOpacity>
          <Text className='color-[#506773]'> {t('and')} </Text>
          <TouchableOpacity onPress={() => { }}>
            <Text>{t('privacy policies')}</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  )
}