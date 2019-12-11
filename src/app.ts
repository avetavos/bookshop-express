import express, { Application } from 'express';
import 'dotenv/config';

export default class App {
	public readonly app: Application;
	constructor() {
		this.app = express();
		this.initialMiddlewares();
		this.initialRoutes();
	}

	private initialMiddlewares() {
		this.app.set('view engine', 'pug');
	}

	private initialRoutes() {
		this.app.get('/', (req, res) => res.send('Hello World'));
	}

	public listen(): void {
		this.app.listen(process.env.PORT, () => {
			console.log(`Application listened on port ${process.env.PORT}`);
		});
	}
}
