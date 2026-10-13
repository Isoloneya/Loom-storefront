import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});

const cache = new InMemoryCache({
  typePolicies: {
    Cart: {
      fields: {
        items: {
          merge(_existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
