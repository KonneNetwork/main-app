import * as AppleAuthentication from 'expo-apple-authentication';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Facebook from '../../../assets/images/svgs/facebook.svg';

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
    <View>
      <TouchableOpacity
        className="bg-[#ffffff2b] rounded-lg items-center px-3 py-2 w-20 self-center mt-5 mb-3 border-2 border-[#EEEEEE]"
        onPress={() => signIn()}
      >
        <Facebook width={42} height={42} />
      </TouchableOpacity>
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