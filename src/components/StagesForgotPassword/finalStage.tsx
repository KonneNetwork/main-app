import { View, Text, TouchableOpacity } from "react-native"
import Input from "../Input"
import Button from "../Button"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUser } from "@/queries/signUp/createUser";

const schema = z.object({
  passwd: z.string().min(6, "minimo de 6 caracteres."),
})

type ForgotPasswdSchema = z.infer<typeof schema>

interface FinalStageProps {
  onClose: () => void
}

export function FinalStage({ onClose }: FinalStageProps) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      passwd: "",
    },
    resolver: zodResolver(schema)
  })
  const { mutate: createUser, isPending } = useCreateUser({ onClose })

  function onSubmit(data: ForgotPasswdSchema) {
    console.log("🚀 ~ onSubmit ~ data:", data)

  }


  return (
    <View className='flex-1 justify-between'>

      <View className=" mt-9 ">

        <Controller
          name="passwd"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input label='Defina uma senha'
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              errorShowInSide={errors.passwd}
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