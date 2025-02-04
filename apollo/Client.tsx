import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://pajalpit.us-east-a.ibm.stepzen.net/api/iced-markhor/graphql',
    headers: {
        Authorization:
            'apikey pajalpit::local.net+1000::e817509107de3e3eddf946128cf1cb9e706751676084a63afbf2dfa3635de7ec',
    },
    cache: new InMemoryCache(),
});

export default client;
