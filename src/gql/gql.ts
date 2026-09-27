/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetCategories {\n    categoryList(filters: { parent_id: { eq: \"2\" } }) {\n      id\n      name\n      url_path\n      product_count\n    }\n  }\n": typeof types.GetCategoriesDocument,
    "\n  query GetCategoryProducts($urlKey: String!) {\n    categoryList(filters: { url_path: { eq: $urlKey } }) {\n      id\n      name\n      product_count\n      products {\n        items {\n          id\n          sku\n          name\n          url_key\n          small_image {\n            url\n          }\n          price_range {\n            minimum_price {\n              regular_price {\n                value\n                currency\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetCategoryProductsDocument,
    "\n  query GetNewArrivals {\n    products(search: \"\", pageSize: 4, sort: { position: DESC }) {\n      items {\n        id\n        sku\n        name\n        url_key\n        small_image {\n          url\n        }\n        price_range {\n          minimum_price {\n            regular_price {\n              value\n              currency\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetNewArrivalsDocument,
};
const documents: Documents = {
    "\n  query GetCategories {\n    categoryList(filters: { parent_id: { eq: \"2\" } }) {\n      id\n      name\n      url_path\n      product_count\n    }\n  }\n": types.GetCategoriesDocument,
    "\n  query GetCategoryProducts($urlKey: String!) {\n    categoryList(filters: { url_path: { eq: $urlKey } }) {\n      id\n      name\n      product_count\n      products {\n        items {\n          id\n          sku\n          name\n          url_key\n          small_image {\n            url\n          }\n          price_range {\n            minimum_price {\n              regular_price {\n                value\n                currency\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetCategoryProductsDocument,
    "\n  query GetNewArrivals {\n    products(search: \"\", pageSize: 4, sort: { position: DESC }) {\n      items {\n        id\n        sku\n        name\n        url_key\n        small_image {\n          url\n        }\n        price_range {\n          minimum_price {\n            regular_price {\n              value\n              currency\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetNewArrivalsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCategories {\n    categoryList(filters: { parent_id: { eq: \"2\" } }) {\n      id\n      name\n      url_path\n      product_count\n    }\n  }\n"): (typeof documents)["\n  query GetCategories {\n    categoryList(filters: { parent_id: { eq: \"2\" } }) {\n      id\n      name\n      url_path\n      product_count\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCategoryProducts($urlKey: String!) {\n    categoryList(filters: { url_path: { eq: $urlKey } }) {\n      id\n      name\n      product_count\n      products {\n        items {\n          id\n          sku\n          name\n          url_key\n          small_image {\n            url\n          }\n          price_range {\n            minimum_price {\n              regular_price {\n                value\n                currency\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCategoryProducts($urlKey: String!) {\n    categoryList(filters: { url_path: { eq: $urlKey } }) {\n      id\n      name\n      product_count\n      products {\n        items {\n          id\n          sku\n          name\n          url_key\n          small_image {\n            url\n          }\n          price_range {\n            minimum_price {\n              regular_price {\n                value\n                currency\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetNewArrivals {\n    products(search: \"\", pageSize: 4, sort: { position: DESC }) {\n      items {\n        id\n        sku\n        name\n        url_key\n        small_image {\n          url\n        }\n        price_range {\n          minimum_price {\n            regular_price {\n              value\n              currency\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetNewArrivals {\n    products(search: \"\", pageSize: 4, sort: { position: DESC }) {\n      items {\n        id\n        sku\n        name\n        url_key\n        small_image {\n          url\n        }\n        price_range {\n          minimum_price {\n            regular_price {\n              value\n              currency\n            }\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;