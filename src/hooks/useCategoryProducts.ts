import { useQuery } from "@apollo/client/react";
import { graphql } from "@/gql";

const GET_CATEGORY_PRODUCTS = graphql(`
  query GetCategoryProducts($urlKey: String!) {
    categoryList(filters: { url_path: { eq: $urlKey } }) {
      id
      name
      product_count
      products {
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
  }
`);

export function useCategoryProducts(urlKey: string) {
  const { data, loading, error } = useQuery(GET_CATEGORY_PRODUCTS, {
    variables: { urlKey },
  });

  const category = data?.categoryList?.[0];

  return {
    category,
    products: category?.products?.items ?? [],
    loading,
    error,
  };
}