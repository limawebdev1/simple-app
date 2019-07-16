import { gql, ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const corsProxy = 'https://cors-anywhere.herokuapp.com/'

const httpLink = createHttpLink({
    uri: `${corsProxy}https://47b7aea7-4f53-4c66-be4a-e6b750c1472d.stg.yonomi.cloud/graphql`,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = cookies.get('Authorization')
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token,
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const getUserProfile = async () => {
    const userProfileResult = await client.query({
        query: gql `
            {
                userProfile {
                    firstName,
                    lastName
                  }
            }
        `
    })
    const {
        firstName,
        lastName,
    } = userProfileResult.data.userProfile
    return {
        firstName,
        lastName,
    }
}

const getDeviceInfo = async () => {
    const deviceResult = await client.query({
        query: gql `
            {
                light (id:"8506dce1-c1e7-4dc7-9e5f-14f70f42d79f") {
                    on,
                    blinkingMode,
                  }
            }
        `
    })
    const {
        blinkingMode,
        on,
    } = deviceResult.data.light
    return {
        blinkingMode,
        on,
    }
}


export const getDashboardInfo = async () => {
    const user = await getUserProfile()
    const device = await getDeviceInfo()
    return {
        ...device,
        user
    }
}


export const updateDeviceState = async (attribute, value) => {
    await client.mutate({
        mutation: gql `
            mutation {
                sendState (input: {
                    id: "8506dce1-c1e7-4dc7-9e5f-14f70f42d79f"
                    type: "Light"
                    ${attribute}: ${value}
                  }) {
                    requestId
                  }
            }
        `
    })
}
