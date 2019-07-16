import Cookies from 'universal-cookie';
const cookies = new Cookies();

require('dotenv').config();

const makeAPICall = async (url, method, body) => {
    const corsProxy = 'https://cors-anywhere.herokuapp.com/'
    return await fetch(corsProxy + url, {
        method,
        body: JSON.stringify(body),

    })
}

export const signIn = async (email, password) => {
    const url = 'https://47b7aea7-4f53-4c66-be4a-e6b750c1472d.stg.yonomi.cloud/account/login'
    const method = 'POST'
    const body = {
        username: email,
        password,
        client_id: process.env.REACT_APP_CLIENT_ID
    }
    const data = await makeAPICall(
        url,
        method,
        body,
    )
    const tokens = await data.json()
    const {
        access_token,
        token_type
    } = tokens
    const authHeader = `${token_type} ${access_token}`
    cookies.set('Authorization', authHeader)
    return {
        authorized: true
    }
}

