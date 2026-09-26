import { useQuery } from "@apollo/client/react";
import { graphql } from "@/gql";

const GET_CATEGORIES = graphql(`
  query GetCategories {
    categoryList(filters: { parent_id: { eq: "2" } }) {
      id
      name
      url_path
      product_count
    }
  }
`);

const SHOP_CATEGORY_NAMES = ["Women", "Men", "Gear", "Training"];

export function useCategories() {
  const { data, loading, error } = useQuery(GET_CATEGORIES);

  const allCategories = data?.categoryList ?? [];
  const shopCategories = allCategories.filter((category) =>
    SHOP_CATEGORY_NAMES.includes(category?.name ?? "")
  );

  return {
    categories: shopCategories,
    allCategories,
    loading,
    error,
  };
}