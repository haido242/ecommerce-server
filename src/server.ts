import App from './app';
import AuthRoute from './routers/auth.route';
import IndexRoute from './routers/index.route';
import UsersRoute from './routers/user.route';
import validateEnv from './utils/validateEnv';
import ProductRoute from './routers/product.route';
import CategoryRoute from './routers/category.route';
import CartRoute from './routers/cart.route';


validateEnv();

const app = new App([
  new IndexRoute(), 
  new UsersRoute(), 
  new AuthRoute(), 
  new ProductRoute(),
  new CategoryRoute(),
  new CartRoute()
]);

app.listen();
