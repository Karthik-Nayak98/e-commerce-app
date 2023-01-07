import { Model, RestSerializer, Server } from 'miragejs';
import {
  getAllCategoriesHandler,
  getCategoryHandler,
} from './backend/controllers/CategoryController';
import {
  getAllProductsByCategoryHandler,
  getAllProductsHandler,
  getProductHandler,
} from './backend/controllers/ProductController';
import { categories } from './backend/db/categories';
import { products } from './backend/db/products';

export function makeServer({ environment = 'development' } = {}) {
  return new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    models: {
      product: Model,
      category: Model,
      user: Model,
      cart: Model,
      wishlist: Model,
    },

    // Runs on the start of the server
    seeds(server) {
      // disballing console logs from Mirage
      server.logging = false;
      products.forEach((item) => {
        server.create('product', { ...item });
      });

      categories.forEach((item) => server.create('category', { ...item }));
    },
    routes() {
      this.namespace = 'api';

      // To allow request to external servers
      this.passthrough('https://identitytoolkit.googleapis.com/***');
      this.passthrough('https://firestore.googleapis.com/***');
      this.passthrough('https://securetoken.googleapis.com/***');

      // products routes (public)
      this.get('/products', getAllProductsHandler.bind(this));
      this.get('/category/:categoryId', getAllProductsByCategoryHandler.bind(this));
      this.get('/products/:productId', getProductHandler.bind(this));

      // categories routes (public)
      this.get('/categories', getAllCategoriesHandler.bind(this));
      this.get('/categories/:categoryId', getCategoryHandler.bind(this));
    },
  });
}
