import { Response } from 'miragejs';

/**
 * All the routes related to Product are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all products in the db.
 * send GET Request at /api/products
 * */

export const getAllProductsHandler = function () {
  return new Response(200, {}, { products: this.db.products });
};

/**
 * This handler handles gets all products in the db.
 * send GET Request at /api/category/:categoryId
 **/

export const getAllProductsByCategoryHandler = function (schema, request) {
  const categoryId = request.params.categoryId;
  try {
    const products = schema.products.where({ category: categoryId }).models;
    return new Response(200, {}, { products });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
/**
 * This handler handles gets all products in the db.
 * send GET Request at /api/user/products/:productId
 * */

export const getProductHandler = function (schema, request) {
  const productId = request.params.productId;
  try {
    const product = schema.products.findBy({ id: productId });
    return new Response(200, {}, { product });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
