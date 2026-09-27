import { useQuery } from "@apollo/client/react";
import { graphql } from "@/gql";

const GET_PRODUCT = graphql(`
  query GetProduct($urlKey: String!) {
    products(filter: { url_key: { eq: $urlKey } }) {
      items {
        id
        sku
        name
        short_description {
          html
        }
        media_gallery {
          url
          label
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
          }
        }
        categories {
          id
          name
          url_path
        }
      }
    }
  }
`);

export function useProduct(urlKey: string) {
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { urlKey },
  });

  return {
    product: data?.products?.items?.[0],
    loading,
    error,
  };
}