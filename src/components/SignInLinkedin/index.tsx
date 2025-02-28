import { useRef } from "react";
import { StyleSheet, Button } from "react-native";
import LinkedInModal, { LinkedInModalPropTypes } from '@gcou/react-native-linkedin';
import { SafeAreaView } from "react-native-safe-area-context";
import * as Linking from 'expo-linking';


export default function SignInLinkedin() {
  const linkedinRef = useRef<LinkedInModalPropTypes | undefined>()
  const REDIRECTURI = `http://192.168.1.48:8081/v2/userinfo`

  async function LinkedinOpenId() {
    Linking.openURL('https://www.linkedin.com/oauth/v2/authorization?client_id=779bjdy56w7bt6&redirect_uri=http://localhost:8081')
  }
  return (
    <SafeAreaView style={styles.container}>
      <LinkedInModal
        ref={linkedinRef}
        clientID="779bjdy56w7bt6"
        clientSecret="WPL_AP1.SGVJIjR58at5q1iV.FNMB7g=="
        redirectUri={REDIRECTURI}
        onSuccess={(token) => console.log(token)}
        onError={(error) => console.log(error)}
      />
      <Button title="Linkedin" onPress={LinkedinOpenId} />
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
})