import assert from 'node:assert/strict';
const endpoint = process.env.GRAPHQL_ENDPOINT ?? 'http://localhost:8080/graphql';
async function query(query, variables = {}) {
  const response = await fetch(endpoint, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query,variables})});
  const body = await response.json();
  assert.ok(response.ok && !body.errors, JSON.stringify(body.errors));
  return body.data;
}
const data = await query(`{ categoryList(filters: {parent_id:{eq:"2"}}) { name url_path products(pageSize:100,sort:{created_at:DESC}) { total_count items { sku name created_at small_image { url } price_range {minimum_price {regular_price {value} final_price {value}}} } } } }`);
const expected = {Women:10,Men:10,Gear:10,Training:10,Sale:10,"What's New":40};
for (const [name,count] of Object.entries(expected)) {
  const category = data.categoryList.find(c=>c.name===name);
  assert.equal(category?.products.total_count, count, name);
  assert.ok(category.products.items.every(p=>p.sku.startsWith('loom-')), name+' includes old items');
  if(name==='Sale') assert.ok(category.products.items.every(p=>p.price_range.minimum_price.final_price.value < p.price_range.minimum_price.regular_price.value));
  console.log(`PASS: ${name}: ${count}`);
}
const products = data.categoryList.find(c=>c.name==="What's New").products.items;
assert.ok(products.every((product, index) => index === 0 || products[index - 1].created_at >= product.created_at), "new arrivals must be newest first");
for (const product of products) {
  const url = new URL(product.small_image.url);
  assert.equal(url.hostname, new URL(endpoint).hostname);
  const response = await fetch(url);
  assert.equal(response.status, 200, product.sku+' image');
  assert.ok(response.headers.get('content-type')?.startsWith('image/'));
}
const pages = [];
for (let page=1; page<=4; page++) {
  const result = await query(`query($page:Int!) { categoryList(filters:{url_key:{eq:"what-is-new"}}) { products(pageSize:12,currentPage:$page,sort:{created_at:DESC}) {items{sku}} } }`,{page});
  pages.push(...result.categoryList[0].products.items.map(p=>p.sku));
}
assert.equal(new Set(pages).size,40,'pagination should expose all products exactly once');
const all = await query('{ products(search:"",pageSize:100) {total_count items{sku}} }');
assert.equal(all.products.total_count,40,'old catalogue products must be gone');
const cart = await query('mutation {createEmptyCart}');
try {
  const add = await query('mutation($id:String!){addProductsToCart(cartId:$id,cartItems:[{sku:"loom-w01",quantity:1},{sku:"loom-g02",quantity:1}]){user_errors{message} cart{items{uid product{sku}} prices{grand_total{value}}}}}',{id:cart.createEmptyCart});
  assert.deepEqual(add.addProductsToCart.user_errors,[]);
  assert.equal(add.addProductsToCart.cart.items.length,2);
  assert.equal(add.addProductsToCart.cart.prices.grand_total.value,115.2,"cart must use the displayed sale price");
  for(const item of add.addProductsToCart.cart.items) await query('mutation($id:String!,$uid:ID!){removeItemFromCart(input:{cart_id:$id,cart_item_uid:$uid}){cart{id}}}',{id:cart.createEmptyCart,uid:item.uid});
} finally { }
console.log('PASS: 40 local images, complete pagination, old catalogue removed, add-to-cart.');
