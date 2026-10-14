"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useApolloClient, useMutation, useQuery } from "@apollo/client/react";
import { graphql } from "@/gql";

const CART_ID_STORAGE_KEY = "loom_cart_id";

let currentCartId: string | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return currentCartId;
}

function getServerSnapshot() {
  return null;
}

function storeCartId(id: string) {
  currentCartId = id;
  localStorage.setItem(CART_ID_STORAGE_KEY, id);
  listeners.forEach((listener) => listener());
}

function clearCartId() {
  currentCartId = null;
  localStorage.removeItem(CART_ID_STORAGE_KEY);
  listeners.forEach((listener) => listener());
}

const CREATE_EMPTY_CART = graphql(`
  mutation CreateEmptyCart {
    createEmptyCart
  }
`);

const ADD_PRODUCTS_TO_CART = graphql(`
  mutation AddProductsToCart($cartId: String!, $sku: String!, $quantity: Float!) {
    addProductsToCart(
      cartId: $cartId
      cartItems: [{ sku: $sku, quantity: $quantity }]
    ) {
      cart {
        id
        total_quantity
      }
      user_errors {
        message
      }
    }
  }
`);

const UPDATE_CART_ITEMS = graphql(`
  mutation UpdateCartItems($cartId: String!, $uid: ID!, $quantity: Float!) {
    updateCartItems(
      input: {
        cart_id: $cartId
        cart_items: [{ cart_item_uid: $uid, quantity: $quantity }]
      }
    ) {
      cart {
        id
        total_quantity
      }
    }
  }
`);

const REMOVE_ITEM_FROM_CART = graphql(`
  mutation RemoveItemFromCart($cartId: String!, $uid: ID!) {
    removeItemFromCart(input: { cart_id: $cartId, cart_item_uid: $uid }) {
      cart {
        id
        total_quantity
      }
    }
  }
`);

const GET_CART = graphql(`
  query GetCart($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      total_quantity
      items {
        uid
        quantity
        product {
          name
          sku
          url_key
          small_image {
            url
          }
        }
        prices {
          row_total {
            value
            currency
          }
        }
      }
      prices {
        grand_total {
          value
          currency
        }
      }
    }
  }
`);

export function useCart() {
  const cartId = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const client = useApolloClient();

  useEffect(() => {
    if (currentCartId) return;
    const stored = localStorage.getItem(CART_ID_STORAGE_KEY);
    if (stored) storeCartId(stored);
  }, []);

  const [createEmptyCart] = useMutation(CREATE_EMPTY_CART);
  const [addProductsToCart] = useMutation(ADD_PRODUCTS_TO_CART);
  const [updateCartItems] = useMutation(UPDATE_CART_ITEMS);
  const [removeItemFromCart] = useMutation(REMOVE_ITEM_FROM_CART);

  const { data, loading } = useQuery(GET_CART, {
    variables: { cartId: cartId ?? "" },
    skip: !cartId,
  });

  const reloadCart = useCallback(
    async (id: string) => {
      await client.query({
        query: GET_CART,
        variables: { cartId: id },
        fetchPolicy: "network-only",
      });
    },
    [client]
  );

  const ensureCartId = useCallback(async (): Promise<string> => {
    if (currentCartId) return currentCartId;

    const result = await createEmptyCart();
    const newCartId = result.data?.createEmptyCart;

    if (!newCartId) {
      throw new Error("Failed to create cart");
    }

    storeCartId(newCartId);
    return newCartId;
  }, [createEmptyCart]);

  const addToCart = useCallback(
    async (sku: string, quantity: number = 1) => {
      const id = await ensureCartId();
      await addProductsToCart({ variables: { cartId: id, sku, quantity } });
      await reloadCart(id);
    },
    [ensureCartId, addProductsToCart, reloadCart]
  );

  const updateQuantity = useCallback(
    async (uid: string, quantity: number) => {
      if (!currentCartId) return;
      await updateCartItems({
        variables: { cartId: currentCartId, uid, quantity },
      });
      await reloadCart(currentCartId);
    },
    [updateCartItems, reloadCart]
  );

  const removeItem = useCallback(
    async (uid: string) => {
      if (!currentCartId) return;
      await removeItemFromCart({ variables: { cartId: currentCartId, uid } });
      await reloadCart(currentCartId);
    },
    [removeItemFromCart, reloadCart]
  );

  return {
    cart: data?.cart,
    items: data?.cart?.items ?? [],
    totalQuantity: data?.cart?.total_quantity ?? 0,
    loading,
    addToCart,
    updateQuantity,
    removeItem,
    resetCart: clearCartId,
  };
}