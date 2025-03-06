import * as AuthSession from "expo-auth-session";
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import { useEffect } from "react";
import * as Linking from 'expo-linking';

const CLIENT_ID = "779bjdy56w7bt6";
const REDIRECT_URI = "https://example.com/auth/callback";
const SECRET_CLIENT = "WPL_AP1.SGVJIjR58at5q1iV.FNMB7g==";
const AUTH_URL = `https://www.linkedin.com/oauth/v2/authorization`;
const TOKEN_URL = `https://www.linkedin.com/oauth/v2/accessToken`;
const SCOPES = ['profile', 'email'];

function useSignInLinkedin() {

  const [request, response, promptAsync] = useAuthRequest({
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI,
    clientSecret: SECRET_CLIENT,
    scopes: SCOPES,
    responseType: 'code'
  }, {
    authorizationEndpoint: AUTH_URL
  })
  console.log("🚀 ~ useSignInLinkedin ~ promptAsync:", async () => await promptAsync())
  console.log("🚀 ~ useSignInLinkedin ~ response:", response)
  console.log("🚀 ~ useSignInLinkedin ~ request:", request)

  async function fetchAccessTokenCode(code: string) {
    console.log("🚀 ~ fetchAccessTokenCode ~ code:", code)
    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: SECRET_CLIENT,
      }).toString(),
    });

    const data = await res.json();
    console.log("Token", data)
  }

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      console.log("🚀 ~ useEffect ~ code:", code)
      fetchAccessTokenCode(code);
    }
    // console.log("resultado", response.params)
  }, [response])

  return { promptAsync, response, request }
}

export default useSignInLinkedin;