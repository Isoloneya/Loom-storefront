import { useQuery } from "@apollo/client/react";
import { graphql } from "@/gql";

const GET_NEW_ARRIVALS = graphql(`
  query GetNewArrivals {
    products(search: "", pageSize: 4, sort: { position: DESC }) {
      items {
        id
        sku
        name
        url_key
        small_image {
          url
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
          }
        }
      }
    }
  }
`);

export function useNewArrivals() {
  const { data, loading, error } = useQuery(GET_NEW_ARRIVALS);

  return {
    products: data?.products?.items ?? [],
    loading,
    error,
  };
}