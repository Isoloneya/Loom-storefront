import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categoryList(filters: { parent_id: { eq: "2" } }) {
      id
      name
      url_path
      product_count
    }
  }
`;