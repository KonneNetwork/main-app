import * as AuthSession from "expo-auth-session";
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import { useEffect, useState } from "react";
import * as Linking from 'expo-linking';

const CLIENT_ID = "779bjdy56w7bt6";
const REDIRECT_URI = "https://5281-200-205-218-178.ngrok-free.app/callback";
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

  async function fetchAccessTokenCode(code: string) {
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
    // console.log("Token", data.access_token)
    setToken(data.access_token)

  }

  async function infoUser(token: string) {
    console.log("🚀 ~ infoUser ~ token:", token)
    const header = { 'Authorization': `Bearer ${token}` }
    const dataProfile = await fetch(PROFILE_URL, {
      method: 'GET',
      headers: header
    })
    dataProfile.json().then(res => console.log("teste", res))

  }


  useEffect(() => {

    if (url) {
      const { queryParams } = Linking.parse(url);

      // console.log("🚀 ~ useEffect ~ queryParams:", queryParams?.code)
      setCode(queryParams.code)
    }

  }, [response])

  useEffect(() => {
    if (code) {
      fetchAccessTokenCode(code);
    }
    // console.log("resultado", response.params)
  }, [code])

  useEffect(() => {
    if (token) {
      // console.log("🚀 ~ useEffect ~ token:", String(token).split(' '))
      infoUser(token)
    }
  }, [token])

  return { promptAsync, response, request }
}

export default useSignInLinkedin;