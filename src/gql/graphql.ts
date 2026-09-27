/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
/** The list of available currency codes. */
export type CurrencyEnum =
  | 'AED'
  | 'AFN'
  | 'ALL'
  | 'AMD'
  | 'ANG'
  | 'AOA'
  | 'ARS'
  | 'AUD'
  | 'AWG'
  | 'AZM'
  | 'AZN'
  | 'BAM'
  | 'BBD'
  | 'BDT'
  | 'BGN'
  | 'BHD'
  | 'BIF'
  | 'BMD'
  | 'BND'
  | 'BOB'
  | 'BRL'
  | 'BSD'
  | 'BTN'
  | 'BUK'
  | 'BWP'
  | 'BYN'
  | 'BZD'
  | 'CAD'
  | 'CDF'
  | 'CHE'
  | 'CHF'
  | 'CHW'
  | 'CLP'
  | 'CNY'
  | 'COP'
  | 'CRC'
  | 'CUP'
  | 'CVE'
  | 'CZK'
  | 'DJF'
  | 'DKK'
  | 'DOP'
  | 'DZD'
  | 'EEK'
  | 'EGP'
  | 'ERN'
  | 'ETB'
  | 'EUR'
  | 'FJD'
  | 'FKP'
  | 'GBP'
  | 'GEK'
  | 'GEL'
  | 'GHS'
  | 'GIP'
  | 'GMD'
  | 'GNF'
  | 'GQE'
  | 'GTQ'
  | 'GYD'
  | 'HKD'
  | 'HNL'
  | 'HRK'
  | 'HTG'
  | 'HUF'
  | 'IDR'
  | 'ILS'
  | 'INR'
  | 'IQD'
  | 'IRR'
  | 'ISK'
  | 'JMD'
  | 'JOD'
  | 'JPY'
  | 'KES'
  | 'KGS'
  | 'KHR'
  | 'KMF'
  | 'KPW'
  | 'KRW'
  | 'KWD'
  | 'KYD'
  | 'KZT'
  | 'LAK'
  | 'LBP'
  | 'LKR'
  | 'LRD'
  | 'LSL'
  | 'LSM'
  | 'LTL'
  | 'LVL'
  | 'LYD'
  | 'MAD'
  | 'MDL'
  | 'MGA'
  | 'MKD'
  | 'MMK'
  | 'MNT'
  | 'MOP'
  | 'MRO'
  | 'MUR'
  | 'MVR'
  | 'MWK'
  | 'MXN'
  | 'MYR'
  | 'MZN'
  | 'NAD'
  | 'NGN'
  | 'NIC'
  | 'NOK'
  | 'NPR'
  | 'NZD'
  | 'OMR'
  | 'PAB'
  | 'PEN'
  | 'PGK'
  | 'PHP'
  | 'PKR'
  | 'PLN'
  | 'PYG'
  | 'QAR'
  | 'RHD'
  | 'ROL'
  | 'RON'
  | 'RSD'
  | 'RUB'
  | 'RWF'
  | 'SAR'
  | 'SBD'
  | 'SCR'
  | 'SDG'
  | 'SEK'
  | 'SGD'
  | 'SHP'
  | 'SKK'
  | 'SLL'
  | 'SOS'
  | 'SRD'
  | 'STD'
  | 'SVC'
  | 'SYP'
  | 'SZL'
  | 'THB'
  | 'TJS'
  | 'TMM'
  | 'TND'
  | 'TOP'
  | 'TRL'
  | 'TRY'
  | 'TTD'
  | 'TWD'
  | 'TZS'
  | 'UAH'
  | 'UGX'
  | 'USD'
  | 'UYU'
  | 'UZS'
  | 'VEB'
  | 'VEF'
  | 'VND'
  | 'VUV'
  | 'WST'
  | 'XCD'
  | 'XOF'
  | 'XPF'
  | 'YER'
  | 'YTL'
  | 'ZAR'
  | 'ZMK'
  | 'ZWD';

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { categoryList: Array<{ id: number | null, name: string | null, url_path: string | null, product_count: number | null } | null> | null };

export type GetCategoryProductsQueryVariables = Exact<{
  urlKey: string;
}>;


export type GetCategoryProductsQuery = { categoryList: Array<{ id: number | null, name: string | null, product_count: number | null, products: { items: Array<
        | { id: number | null, sku: string | null, name: string | null, url_key: string | null, small_image: { url: string | null } | null, price_range: { minimum_price: { regular_price: { value: number | null, currency: CurrencyEnum | null } } } }
        | { id: number | null, sku: string | null, name: string | null, url_key: string | null, small_image: { url: string | null } | null, price_range: { minimum_price: { regular_price: { value: number | null, currency: CurrencyEnum | null } } } }
        | { id: number | null, sku: string | null, name: string | null, url_key: string | null, small_image: { url: string | null } | null, price_range: { minimum_price: { regular_price: { value: number | null, currency: CurrencyEnum | null } } } }
        | { id: number | null, sku: string | null, name: string | null, url_key: string | null, small_image: { url: string | null } | null, price_range: { minimum_price: { regular_price: { value: number | null, currency: CurrencyEnum | null } } } }
        | { id: number | null, sku: string | null, name: string | null, url_key: string | null, small_image: { url: string | null } | null, price_range: { minimum_price: { regular_price: { value: number | null, currency: CurrencyEnum | null } } } }
        | { id: number | null, sku: string | null, name: string | null, url_key: string | null, small_image: { url: string | null } | null, price_range: { minimum_price: { regular_price: { value: number | null, currency: CurrencyEnum | null } } } }
       | null> | null } | null } | null> | null };

export type GetNewArrivalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNewArrivalsQuery = { products: { items: Array<
      | { id: number | null, sku: string | null, name: string | null, url_key: string | null, small_image: { url: string | null } | null, price_range: { minimum_price: { regular_price: { value: number | null, currency: CurrencyEnum | null } } } }
      | { id: number | null, sku: string | null, name: string | null, url_key: string | null, small_image: { url: string | null } | null, price_range: { minimum_price: { regular_price: { value: number | null, currency: CurrencyEnum | null } } } }
      | { id: number | null, sku: string | null, name: string | null, url_key: string | null, small_image: { url: string | null } | null, price_range: { minimum_price: { regular_price: { value: number | null, currency: CurrencyEnum | null } } } }
      | { id: number | null, sku: string | null, name: string | null, url_key: string | null, small_image: { url: string | null } | null, price_range: { minimum_price: { regular_price: { value: number | null, currency: CurrencyEnum | null } } } }
      | { id: number | null, sku: string | null, name: string | null, url_key: string | null, small_image: { url: string | null } | null, price_range: { minimum_price: { regular_price: { value: number | null, currency: CurrencyEnum | null } } } }
      | { id: number | null, sku: string | null, name: string | null, url_key: string | null, small_image: { url: string | null } | null, price_range: { minimum_price: { regular_price: { value: number | null, currency: CurrencyEnum | null } } } }
     | null> | null } | null };

export type GetProductQueryVariables = Exact<{
  urlKey: string;
}>;


export type GetProductQuery = { products: { items: Array<
      | { id: number | null, sku: string | null, name: string | null, short_description: { html: string } | null, media_gallery: Array<
          | { url: string | null, label: string | null }
          | { url: string | null, label: string | null }
         | null> | null, price_range: { minimum_price: { regular_price: { value: number | null, currency: CurrencyEnum | null } } }, categories: Array<{ id: number | null, name: string | null, url_path: string | null } | null> | null }
      | { id: number | null, sku: string | null, name: string | null, short_description: { html: string } | null, media_gallery: Array<
          | { url: string | null, label: string | null }
          | { url: string | null, label: string | null }
         | null> | null, price_range: { minimum_price: { regular_price: { value: number | null, currency: CurrencyEnum | null } } }, categories: Array<{ id: number | null, name: string | null, url_path: string | null } | null> | null }
      | { id: number | null, sku: string | null, name: string | null, short_description: { html: string } | null, media_gallery: Array<
          | { url: string | null, label: string | null }
          | { url: string | null, label: string | null }
         | null> | null, price_range: { minimum_price: { regular_price: { value: number | null, currency: CurrencyEnum | null } } }, categories: Array<{ id: number | null, name: string | null, url_path: string | null } | null> | null }
      | { id: number | null, sku: string | null, name: string | null, short_description: { html: string } | null, media_gallery: Array<
          | { url: string | null, label: string | null }
          | { url: string | null, label: string | null }
         | null> | null, price_range: { minimum_price: { regular_price: { value: number | null, currency: CurrencyEnum | null } } }, categories: Array<{ id: number | null, name: string | null, url_path: string | null } | null> | null }
      | { id: number | null, sku: string | null, name: string | null, short_description: { html: string } | null, media_gallery: Array<
          | { url: string | null, label: string | null }
          | { url: string | null, label: string | null }
         | null> | null, price_range: { minimum_price: { regular_price: { value: number | null, currency: CurrencyEnum | null } } }, categories: Array<{ id: number | null, name: string | null, url_path: string | null } | null> | null }
      | { id: number | null, sku: string | null, name: string | null, short_description: { html: string } | null, media_gallery: Array<
          | { url: string | null, label: string | null }
          | { url: string | null, label: string | null }
         | null> | null, price_range: { minimum_price: { regular_price: { value: number | null, currency: CurrencyEnum | null } } }, categories: Array<{ id: number | null, name: string | null, url_path: string | null } | null> | null }
     | null> | null } | null };


export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"parent_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"StringValue","value":"2","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url_path"}},{"kind":"Field","name":{"kind":"Name","value":"product_count"}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategoryProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"urlKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"url_path"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"urlKey"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"product_count"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url_key"}},{"kind":"Field","name":{"kind":"Name","value":"small_image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price_range"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minimum_price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"regular_price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoryProductsQuery, GetCategoryProductsQueryVariables>;
export const GetNewArrivalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNewArrivals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"StringValue","value":"","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"4"}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"EnumValue","value":"DESC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url_key"}},{"kind":"Field","name":{"kind":"Name","value":"small_image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price_range"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minimum_price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"regular_price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetNewArrivalsQuery, GetNewArrivalsQueryVariables>;
export const GetProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"urlKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"url_key"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"urlKey"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"short_description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"html"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media_gallery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price_range"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minimum_price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"regular_price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url_path"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductQuery, GetProductQueryVariables>;