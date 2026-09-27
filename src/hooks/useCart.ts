"use client";

import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { graphql } from "@/gql";

const CART_ID_STORAGE_KEY = "loom_cart_id";

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

const GET_CART = graphql(`
  query GetCart($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      total_quantity
      items {
        id
        quantity
        product {
          name
          sku
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
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CART_ID_STORAGE_KEY);
    if (stored) {
      setCartId(stored);
    }
  }, []);

  const [createEmptyCart] = useMutation(CREATE_EMPTY_CART);
  const [addProductsToCart] = useMutation(ADD_PRODUCTS_TO_CART);

  const { data, loading, refetch } = useQuery(GET_CART, {
    variables: { cartId: cartId ?? "" },
    skip: !cartId,
  });

  const ensureCartId = useCallback(async (): Promise<string> => {
    if (cartId) return cartId;

    const result = await createEmptyCart();
    const newCartId = result.data?.createEmptyCart;

    if (!newCartId) {
      throw new Error("Failed to create cart");
    }

    localStorage.setItem(CART_ID_STORAGE_KEY, newCartId);
    setCartId(newCartId);
    return newCartId;
  }, [cartId, createEmptyCart]);

  const addToCart = useCallback(
    async (sku: string, quantity: number = 1) => {
      const id = await ensureCartId();

      await addProductsToCart({
        variables: { cartId: id, sku, quantity },
      });

      await refetch();
    },
    [ensureCartId, addProductsToCart, refetch]
  );

  return {
    cart: data?.cart,
    items: data?.cart?.items ?? [],
    totalQuantity: data?.cart?.total_quantity ?? 0,
    loading,
    addToCart,
  };
}