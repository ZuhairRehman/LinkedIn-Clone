import { ApolloClient, InMemoryCache, TypePolicies } from '@apollo/client';

const typePolicies: TypePolicies = {
    Query: {
        fields: {
            postPaginatedList: {
                keyArgs: false,
                merge(existing = [], incoming) {
                    return [...existing, ...incoming];
                },
            },
        },
    },
};

const client = new ApolloClient({
    uri: 'https://pajalpit.us-east-a.ibm.stepzen.net/api/iced-markhor/graphql',
    headers: {
        Authorization:
            'apikey pajalpit::local.net+1000::e817509107de3e3eddf946128cf1cb9e706751676084a63afbf2dfa3635de7ec',
    },
    cache: new InMemoryCache({ typePolicies }),
});

export default client;
