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
    "\n  mutation CreateEmptyCart {\n    createEmptyCart\n  }\n": typeof types.CreateEmptyCartDocument,
    "\n  mutation AddProductsToCart($cartId: String!, $sku: String!, $quantity: Float!) {\n    addProductsToCart(\n      cartId: $cartId\n      cartItems: [{ sku: $sku, quantity: $quantity }]\n    ) {\n      cart {\n        id\n        total_quantity\n      }\n      user_errors {\n        message\n      }\n    }\n  }\n": typeof types.AddProductsToCartDocument,
    "\n  query GetCart($cartId: String!) {\n    cart(cart_id: $cartId) {\n      id\n      total_quantity\n      items {\n        id\n        quantity\n        product {\n          name\n          sku\n          small_image {\n            url\n          }\n        }\n        prices {\n          row_total {\n            value\n            currency\n          }\n        }\n      }\n      prices {\n        grand_total {\n          value\n          currency\n        }\n      }\n    }\n  }\n": typeof types.GetCartDocument,
    "\n  query GetCategories {\n    categoryList(filters: { parent_id: { eq: \"2\" } }) {\n      id\n      name\n      url_path\n      product_count\n    }\n  }\n": typeof types.GetCategoriesDocument,
    "\n  query GetCategoryProducts($urlKey: String!) {\n    categoryList(filters: { url_path: { eq: $urlKey } }) {\n      id\n      name\n      product_count\n      products {\n        items {\n          id\n          sku\n          name\n          url_key\n          small_image {\n            url\n          }\n          price_range {\n            minimum_price {\n              regular_price {\n                value\n                currency\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetCategoryProductsDocument,
    "\n  query GetNewArrivals {\n    products(search: \"\", pageSize: 4, sort: { position: DESC }) {\n      items {\n        id\n        sku\n        name\n        url_key\n        small_image {\n          url\n        }\n        price_range {\n          minimum_price {\n            regular_price {\n              value\n              currency\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetNewArrivalsDocument,
    "\n  query GetProduct($urlKey: String!) {\n    products(filter: { url_key: { eq: $urlKey } }) {\n      items {\n        id\n        sku\n        name\n        short_description {\n          html\n        }\n        media_gallery {\n          url\n          label\n        }\n        price_range {\n          minimum_price {\n            regular_price {\n              value\n              currency\n            }\n          }\n        }\n        categories {\n          id\n          name\n          url_path\n        }\n      }\n    }\n  }\n": typeof types.GetProductDocument,
};
const documents: Documents = {
    "\n  mutation CreateEmptyCart {\n    createEmptyCart\n  }\n": types.CreateEmptyCartDocument,
    "\n  mutation AddProductsToCart($cartId: String!, $sku: String!, $quantity: Float!) {\n    addProductsToCart(\n      cartId: $cartId\n      cartItems: [{ sku: $sku, quantity: $quantity }]\n    ) {\n      cart {\n        id\n        total_quantity\n      }\n      user_errors {\n        message\n      }\n    }\n  }\n": types.AddProductsToCartDocument,
    "\n  query GetCart($cartId: String!) {\n    cart(cart_id: $cartId) {\n      id\n      total_quantity\n      items {\n        id\n        quantity\n        product {\n          name\n          sku\n          small_image {\n            url\n          }\n        }\n        prices {\n          row_total {\n            value\n            currency\n          }\n        }\n      }\n      prices {\n        grand_total {\n          value\n          currency\n        }\n      }\n    }\n  }\n": types.GetCartDocument,
    "\n  query GetCategories {\n    categoryList(filters: { parent_id: { eq: \"2\" } }) {\n      id\n      name\n      url_path\n      product_count\n    }\n  }\n": types.GetCategoriesDocument,
    "\n  query GetCategoryProducts($urlKey: String!) {\n    categoryList(filters: { url_path: { eq: $urlKey } }) {\n      id\n      name\n      product_count\n      products {\n        items {\n          id\n          sku\n          name\n          url_key\n          small_image {\n            url\n          }\n          price_range {\n            minimum_price {\n              regular_price {\n                value\n                currency\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetCategoryProductsDocument,
    "\n  query GetNewArrivals {\n    products(search: \"\", pageSize: 4, sort: { position: DESC }) {\n      items {\n        id\n        sku\n        name\n        url_key\n        small_image {\n          url\n        }\n        price_range {\n          minimum_price {\n            regular_price {\n              value\n              currency\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetNewArrivalsDocument,
    "\n  query GetProduct($urlKey: String!) {\n    products(filter: { url_key: { eq: $urlKey } }) {\n      items {\n        id\n        sku\n        name\n        short_description {\n          html\n        }\n        media_gallery {\n          url\n          label\n        }\n        price_range {\n          minimum_price {\n            regular_price {\n              value\n              currency\n            }\n          }\n        }\n        categories {\n          id\n          name\n          url_path\n        }\n      }\n    }\n  }\n": types.GetProductDocument,
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
export function graphql(source: "\n  mutation CreateEmptyCart {\n    createEmptyCart\n  }\n"): (typeof documents)["\n  mutation CreateEmptyCart {\n    createEmptyCart\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddProductsToCart($cartId: String!, $sku: String!, $quantity: Float!) {\n    addProductsToCart(\n      cartId: $cartId\n      cartItems: [{ sku: $sku, quantity: $quantity }]\n    ) {\n      cart {\n        id\n        total_quantity\n      }\n      user_errors {\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddProductsToCart($cartId: String!, $sku: String!, $quantity: Float!) {\n    addProductsToCart(\n      cartId: $cartId\n      cartItems: [{ sku: $sku, quantity: $quantity }]\n    ) {\n      cart {\n        id\n        total_quantity\n      }\n      user_errors {\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCart($cartId: String!) {\n    cart(cart_id: $cartId) {\n      id\n      total_quantity\n      items {\n        id\n        quantity\n        product {\n          name\n          sku\n          small_image {\n            url\n          }\n        }\n        prices {\n          row_total {\n            value\n            currency\n          }\n        }\n      }\n      prices {\n        grand_total {\n          value\n          currency\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCart($cartId: String!) {\n    cart(cart_id: $cartId) {\n      id\n      total_quantity\n      items {\n        id\n        quantity\n        product {\n          name\n          sku\n          small_image {\n            url\n          }\n        }\n        prices {\n          row_total {\n            value\n            currency\n          }\n        }\n      }\n      prices {\n        grand_total {\n          value\n          currency\n        }\n      }\n    }\n  }\n"];
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
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProduct($urlKey: String!) {\n    products(filter: { url_key: { eq: $urlKey } }) {\n      items {\n        id\n        sku\n        name\n        short_description {\n          html\n        }\n        media_gallery {\n          url\n          label\n        }\n        price_range {\n          minimum_price {\n            regular_price {\n              value\n              currency\n            }\n          }\n        }\n        categories {\n          id\n          name\n          url_path\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProduct($urlKey: String!) {\n    products(filter: { url_key: { eq: $urlKey } }) {\n      items {\n        id\n        sku\n        name\n        short_description {\n          html\n        }\n        media_gallery {\n          url\n          label\n        }\n        price_range {\n          minimum_price {\n            regular_price {\n              value\n              currency\n            }\n          }\n        }\n        categories {\n          id\n          name\n          url_path\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;