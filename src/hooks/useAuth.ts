"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useApolloClient, useMutation, useQuery } from "@apollo/client/react";
import { graphql } from "@/gql";
import {
  clearToken,
  getToken,
  setToken,
  subscribeToken,
} from "@/lib/auth/token";
import { CART_ID_STORAGE_KEY, clearCartId, storeCartId } from "@/hooks/useCart";

const GET_CUSTOMER = graphql(`
  query GetCustomer {
    customer {
      firstname
      lastname
      email
    }
  }
`);

const GET_CUSTOMER_CART = graphql(`
  query GetCustomerCart {
    customerCart {
      id
    }
  }
`);

const GENERATE_CUSTOMER_TOKEN = graphql(`
  mutation GenerateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`);

const CREATE_CUSTOMER = graphql(`
  mutation CreateCustomer(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    createCustomerV2(
      input: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
      }
    ) {
      customer {
        email
      }
    }
  }
`);

const MERGE_CARTS = graphql(`
  mutation MergeCarts($source: String!, $destination: String!) {
    mergeCarts(source_cart_id: $source, destination_cart_id: $destination) {
      id
    }
  }
`);

const REVOKE_CUSTOMER_TOKEN = graphql(`
  mutation RevokeCustomerToken {
    revokeCustomerToken {
      result
    }
  }
`);

export type RegisterInput = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

function getServerSnapshot() {
  return null;
}

export function useAuth() {
  const token = useSyncExternalStore(
    subscribeToken,
    getToken,
    getServerSnapshot
  );
  const client = useApolloClient();

  const [generateToken] = useMutation(GENERATE_CUSTOMER_TOKEN);
  const [createCustomer] = useMutation(CREATE_CUSTOMER);
  const [mergeCarts] = useMutation(MERGE_CARTS);
  const [revokeToken] = useMutation(REVOKE_CUSTOMER_TOKEN);

  const { data, loading, error } = useQuery(GET_CUSTOMER, { skip: !token });

  useEffect(() => {
    if (token && error && /authoriz/i.test(error.message)) {
      clearToken();
      clearCartId();
    }
  }, [token, error]);

  const adoptCustomerCart = useCallback(async () => {
    const result = await client.query({
      query: GET_CUSTOMER_CART,
      fetchPolicy: "network-only",
    });
    const customerCartId = result.data?.customerCart?.id;
    if (!customerCartId) return;

    const guestCartId = localStorage.getItem(CART_ID_STORAGE_KEY);
    if (guestCartId && guestCartId !== customerCartId) {
      await mergeCarts({
        variables: { source: guestCartId, destination: customerCartId },
      }).catch(() => null);
    }
    storeCartId(customerCartId);
  }, [client, mergeCarts]);

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await generateToken({ variables: { email, password } });
      const newToken = result.data?.generateCustomerToken?.token;
      if (!newToken) {
        throw new Error("Sign in failed");
      }
      setToken(newToken);
      await adoptCustomerCart();
    },
    [generateToken, adoptCustomerCart]
  );

  const register = useCallback(
    async (input: RegisterInput) => {
      await createCustomer({ variables: input });
      await login(input.email, input.password);
    },
    [createCustomer, login]
  );

  const logout = useCallback(async () => {
    await revokeToken().catch(() => null);
    clearToken();
    clearCartId();
    await client.resetStore();
  }, [revokeToken, client]);

  return {
    customer: token ? data?.customer : null,
    isAuthenticated: Boolean(token),
    loading: Boolean(token) && loading,
    login,
    register,
    logout,
  };
}
