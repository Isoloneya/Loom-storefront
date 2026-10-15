import { useQuery } from "@apollo/client/react";
import { graphql } from "@/gql";

const GET_CATEGORY_PRODUCTS = graphql(`
  query GetCategoryProducts($urlKey: String!, $page: Int!) {
    categoryList(filters: { url_path: { eq: $urlKey } }) {
      id
      name
      product_count
      products(pageSize: 12, currentPage: $page, sort: { created_at: DESC }) {
        total_count
        page_info { current_page total_pages }
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

export function useCategoryProducts(urlKey: string, page = 1) {
  const { data, loading, error } = useQuery(GET_CATEGORY_PRODUCTS, {
    variables: { urlKey, page },
    fetchPolicy: "cache-and-network",
  });
  const category = data?.categoryList?.[0];
  return {
    category,
    products: category?.products?.items ?? [],
    totalPages: category?.products?.page_info?.total_pages ?? 1,
    totalCount: category?.products?.total_count ?? 0,
    loading,
    error,
  };
}
