import { useAuthRequest } from 'expo-auth-session';
import { useEffect, useState } from "react";
import * as Linking from 'expo-linking';
import useLoginSocial from "@/queries/login/loginSocial";
import { Platform } from "react-native";

const CLIENT_ID = "779bjdy56w7bt6";
const REDIRECT_URI = "https://konne-api.onrender.com/callback";
const SECRET_CLIENT = "WPL_AP1.SGVJIjR58at5q1iV.FNMB7g==";
const AUTH_URL = `https://www.linkedin.com/oauth/v2/authorization`;
const TOKEN_URL = `https://www.linkedin.com/oauth/v2/accessToken`;
const PROFILE_URL = "https://api.linkedin.com/v2/userinfo"
const SCOPES = ['openid', 'profile', 'email'];

function useSignInLinkedin() {
  const [token, setToken] = useState();
  const [code, setCode] = useState();
  const url = Linking.useURL();
  const [request, response, promptAsync] = useAuthRequest({
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI,
    clientSecret: SECRET_CLIENT,
    scopes: SCOPES,
    responseType: 'code'
  }, {
    authorizationEndpoint: AUTH_URL
  })

  const { mutate: loginSocial } = useLoginSocial()

  async function fetchAccessTokenCode(code: string) {
    console.log("primeira função")
    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: SECRET_CLIENT,
      }).toString(),
    });

    const data = await res.json();

    setToken(data.access_token)

  }

  async function infoUser(token: string) {

    const header = { 'Authorization': `Bearer ${token}` }
    const dataProfile = await fetch(PROFILE_URL, {
      method: 'GET',
      headers: header
    })
    const infoData = await dataProfile.json().catch((e) => { console.log(e) })

    const transformData = {
      foto_usuario: infoData?.picture,
      email: infoData?.email,
      nome_usuario: infoData?.name,
      uuid: infoData?.sub,
      integracao: 'linkedin'
    }


    if (infoData) {
      loginSocial(transformData)
    }

  }

  useEffect(() => {
    if (url) {
      const { queryParams } = Linking.parse(url);
      setCode(queryParams.code)
    }

    if (code !== null && Platform.OS === 'ios') {
      const code = response?.params.code
      setCode(code)

    }

  }, [response])


  useEffect(() => {
    if (code) {
      fetchAccessTokenCode(code);
    }

  }, [code])

  useEffect(() => {
    if (token) {
      infoUser(token)
    }
  }, [token])

  return { promptAsync, response, request }
}

export default useSignInLinkedin;