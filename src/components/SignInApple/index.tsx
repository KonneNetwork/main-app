import * as AppleAuthentication from 'expo-apple-authentication';
import { View, StyleSheet } from 'react-native';

export default function SignInApple() {

  async function signIn() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })
      console.log("🚀 ~ signIn ~ credential:",
        credential.identityToken,
        credential.email,
        credential.realUserStatus,
        credential.fullName,
        credential.authorizationCode,
        credential.state,
        credential.user
      )
    } catch (error: any) {
      if (error.code === "ERR_REQUEST_CANCELED") {
        AppleAuthentication.signOutAsync({ user: "Carlos", state: "Canceled" })
      } else {
        console.log(error)
      }
    }
  }
  return (
    <View style={styles.container}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={signIn}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 44,
  },
});