import App from './app';
import Authentication from './controllers/authentication';
import Store from './controllers/store';

const Server = new App([new Authentication(), new Store()]);

Server.listen();
