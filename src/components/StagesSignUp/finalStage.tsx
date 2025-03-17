import { View, Text, TouchableOpacity, Platform, StyleSheet } from "react-native"
import Input from "../Input"
import Button from "../Button"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUser } from "@/queries/signUp/createUser";
import { useTranslation } from "react-i18next";
import ButtonSocialLogin from "../ButtonSocialLogin";
import SignInApple from "../SignInApple";
import useSignInLinkedin from "@/hooks/useSignInLinkedin";
import Linkedin from '../../../assets/images/svgs/linkedin.svg';
import { mask, unmask } from "remask";
import { router } from "expo-router";

const schema = z.object({
  name: z.string().min(1, { message: 'adicione o nome' }),
  email: z.string().min(1, { message: 'adicione um email' }).email('email inválido.'),
  cpf: z.string().refine((text) => unmask(text).length === 11, "cpf deve possuir 11 caracteres"),
  passwd: z.string().min(6, "minimo de 6 caracteres."),
})

type SignUpSchema = z.infer<typeof schema>

interface FinalStageProps {
  onClose: () => void
}

export function FinalStage({ onClose }: FinalStageProps) {
  const { t } = useTranslation("translation", { keyPrefix: "SignUp" });
  const { promptAsync, request, response } = useSignInLinkedin();
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

    const dataTransform = {
      ...data, cpf: unmask(data.cpf)
    }
    console.log("🚀 ~ onSubmit ~ dataTransform: teste", dataTransform)

    createUser(data)

  }


  return (
    <View className='flex-1 justify-between'>

      <View className=" flex-row justify-center items-center self-center gap-5">

        <ButtonSocialLogin typeMode='mode' action={() => promptAsync()}>
          <Linkedin width={44} height={44} />
        </ButtonSocialLogin>


        {Platform.OS === "ios" && <SignInApple type='mode' />}

      </View>
      <View style={styles.container}>
        <View style={styles.line} />
        <Text style={styles.text}>OU</Text>
        <View style={styles.line} />
      </View>

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
              onChangeText={(text) => (onChange(mask(text, ["999.999.999-99"])))}
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
          <TouchableOpacity onPress={() => { router.navigate('/terms-use') }}>
            <Text>{t('terms uses')}</Text>
          </TouchableOpacity>
          <Text className='color-[#506773]'> {t('and')} </Text>
          <TouchableOpacity onPress={() => { router.navigate('/(public)/police-privacy') }}>
            <Text>{t('privacy policies')}</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#528A8C',
  },
  text: {
    marginHorizontal: 10,
    color: '#528A8C',
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '400',
  },
});
