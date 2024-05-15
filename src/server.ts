import App from './app';
import AuthRoute from './routers/auth.route';
import IndexRoute from './routers/index.route';
import UsersRoute from './routers/user.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute()]);

app.listen();
