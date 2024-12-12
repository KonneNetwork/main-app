import Toast, { BaseToast, BaseToastProps, ErrorToast, } from "react-native-toast-message";

export const toastConfig = {

  sucess: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "green"
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),

  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  )

}
