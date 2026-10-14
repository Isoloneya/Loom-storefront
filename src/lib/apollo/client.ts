import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { getToken } from "@/lib/auth/token";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  fetch: (input, init) => {
    const token = getToken();
    const headers = new Headers(init?.headers);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return fetch(input, { ...init, headers });
  },
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
