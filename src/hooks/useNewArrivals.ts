import { useQuery } from "@apollo/client/react";
import { graphql } from "@/gql";

const GET_NEW_ARRIVALS = graphql(`
  query GetNewArrivals {
    categoryList(filters: { url_key: { eq: "what-is-new" } }) {
      products(pageSize: 12, sort: { created_at: DESC }) {
        items {
          id
          sku
          name
          url_key
          small_image { url }
          price_range {
            minimum_price {
              regular_price { value currency }
              final_price { value currency }
            }
          }
        }
      }
    }
  }
`);

export function useNewArrivals() {
  const { data, loading, error } = useQuery(GET_NEW_ARRIVALS, {
    fetchPolicy: "cache-and-network",
  });
  return { products: data?.categoryList?.[0]?.products?.items ?? [], loading, error };
}
