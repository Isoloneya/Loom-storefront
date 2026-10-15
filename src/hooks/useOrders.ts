"use client";

import { useQuery } from "@apollo/client/react";
import { graphql } from "@/gql";

const GET_ORDERS = graphql(`
  query GetOrders {
    customer {
      orders(pageSize: 20) {
        items {
          number
          order_date
          status
          total {
            grand_total {
              value
              currency
            }
          }
          items {
            product_name
            quantity_ordered
          }
        }
      }
    }
  }
`);

export function useOrders(enabled: boolean) {
  const { data, loading, error } = useQuery(GET_ORDERS, {
    skip: !enabled,
    fetchPolicy: "cache-and-network",
  });

  const orders = (data?.customer?.orders?.items ?? [])
    .flatMap((order) => (order ? [order] : []))
    .sort((a, b) => (b.order_date ?? "").localeCompare(a.order_date ?? ""));

  return { orders, loading, error };
}
