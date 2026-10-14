"use client";

import { useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { graphql } from "@/gql";

const GET_COUNTRIES = graphql(`
  query GetCountries {
    countries {
      id
      full_name_english
      available_regions {
        code
        name
      }
    }
  }
`);

const SET_SHIPPING_ADDRESS = graphql(`
  mutation SetShippingAddress(
    $cartId: String!
    $firstname: String!
    $lastname: String!
    $street: [String]!
    $city: String!
    $region: String!
    $postcode: String!
    $countryCode: String!
    $telephone: String!
  ) {
    setShippingAddressesOnCart(
      input: {
        cart_id: $cartId
        shipping_addresses: [
          {
            address: {
              firstname: $firstname
              lastname: $lastname
              street: $street
              city: $city
              region: $region
              postcode: $postcode
              country_code: $countryCode
              telephone: $telephone
            }
          }
        ]
      }
    ) {
      cart {
        shipping_addresses {
          available_shipping_methods {
            carrier_code
            method_code
            carrier_title
            method_title
            amount {
              value
              currency
            }
          }
        }
      }
    }
  }
`);

const SET_SHIPPING_METHOD = graphql(`
  mutation SetShippingMethod(
    $cartId: String!
    $carrierCode: String!
    $methodCode: String!
  ) {
    setShippingMethodsOnCart(
      input: {
        cart_id: $cartId
        shipping_methods: [{ carrier_code: $carrierCode, method_code: $methodCode }]
      }
    ) {
      cart {
        available_payment_methods {
          code
          title
        }
        prices {
          grand_total {
            value
            currency
          }
        }
      }
    }
  }
`);

const SET_BILLING_ADDRESS = graphql(`
  mutation SetBillingAddress($cartId: String!) {
    setBillingAddressOnCart(
      input: { cart_id: $cartId, billing_address: { same_as_shipping: true } }
    ) {
      cart {
        id
      }
    }
  }
`);

const SET_GUEST_EMAIL = graphql(`
  mutation SetGuestEmail($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        email
      }
    }
  }
`);

const SET_PAYMENT_METHOD = graphql(`
  mutation SetPaymentMethod($cartId: String!, $code: String!) {
    setPaymentMethodOnCart(
      input: { cart_id: $cartId, payment_method: { code: $code } }
    ) {
      cart {
        selected_payment_method {
          code
        }
      }
    }
  }
`);

const PLACE_ORDER = graphql(`
  mutation PlaceOrder($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      order {
        order_number
      }
      errors {
        code
        message
      }
    }
  }
`);

export type ShippingAddressInput = {
  firstname: string;
  lastname: string;
  street: string;
  city: string;
  region: string;
  postcode: string;
  countryCode: string;
  telephone: string;
};

export function useCheckout() {
  const { data: countriesData } = useQuery(GET_COUNTRIES);

  const [setShippingAddress] = useMutation(SET_SHIPPING_ADDRESS);
  const [setShippingMethod] = useMutation(SET_SHIPPING_METHOD);
  const [setBillingAddress] = useMutation(SET_BILLING_ADDRESS);
  const [setGuestEmail] = useMutation(SET_GUEST_EMAIL);
  const [setPaymentMethod] = useMutation(SET_PAYMENT_METHOD);
  const [placeOrder] = useMutation(PLACE_ORDER);

  const allowedCountries = ["US", "UA"];
  const countries = (countriesData?.countries ?? []).filter((country) =>
    allowedCountries.includes(country?.id ?? "")
  );

  const submitShippingAddress = useCallback(
    async (cartId: string, address: ShippingAddressInput) => {
      const result = await setShippingAddress({
        variables: {
          cartId,
          firstname: address.firstname,
          lastname: address.lastname,
          street: [address.street],
          city: address.city,
          region: address.region,
          postcode: address.postcode,
          countryCode: address.countryCode,
          telephone: address.telephone,
        },
      });
      return (
        result.data?.setShippingAddressesOnCart?.cart?.shipping_addresses?.[0]
          ?.available_shipping_methods ?? []
      );
    },
    [setShippingAddress]
  );

  const submitShippingMethod = useCallback(
    async (cartId: string, carrierCode: string, methodCode: string) => {
      const result = await setShippingMethod({
        variables: { cartId, carrierCode, methodCode },
      });
      return result.data?.setShippingMethodsOnCart?.cart;
    },
    [setShippingMethod]
  );

  const completeOrder = useCallback(
    async (cartId: string, email: string | null, paymentCode: string) => {
      await setBillingAddress({ variables: { cartId } });
      if (email) {
        await setGuestEmail({ variables: { cartId, email } });
      }
      await setPaymentMethod({ variables: { cartId, code: paymentCode } });
      const result = await placeOrder({ variables: { cartId } });

      const errors = result.data?.placeOrder?.errors ?? [];
      if (errors.length > 0) {
        throw new Error(errors[0]?.message ?? "Order failed");
      }

      const orderNumber = result.data?.placeOrder?.order?.order_number;
      if (!orderNumber) {
        throw new Error("Order number missing");
      }

      return orderNumber;
    },
    [setBillingAddress, setGuestEmail, setPaymentMethod, placeOrder]
  );

  return {
    countries,
    submitShippingAddress,
    submitShippingMethod,
    completeOrder,
  };
}
