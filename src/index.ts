import App from './app';
import Authentication from './controllers/authentication.controller';
import Store from './controllers/store.controller';

const Server = new App([new Authentication(), new Store()]);

Server.listen();
