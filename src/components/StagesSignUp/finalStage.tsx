import { View, Text, TouchableOpacity } from "react-native"
import Input from "../Input"
import Button from "../Button"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUser } from "@/queries/signUp/createUser";

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
              label='Nome Completo'
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              error={errors.name}
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
              error={errors.email}
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
              error={errors.cpf}
            />
          )} />
        <Controller
          name="passwd"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input label='Defina uma senha'
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              error={errors.passwd}
            />

          )} />
        <Button loading={isPending} variant='active' title="Concluir Cadastro" onPress={handleSubmit(onSubmit)} />
      </View>



      <View className='self-center  mt-9 items-center'>
        <Text className='color-[#506773]'>
          Ao continuar você concorda com os
        </Text>
        <View className='self-center flex-row items-center'>
          <TouchableOpacity onPress={() => { }}>
            <Text>Termos de Uso </Text>
          </TouchableOpacity>
          <Text className='color-[#506773]'>e</Text>
          <TouchableOpacity onPress={() => { }}>
            <Text> Políticas de Privacidade.</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  )
}