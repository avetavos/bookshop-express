import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import 'dotenv/config';

export default class App {
	public app: express.Application;
	constructor(controllers: Controller[]) {
		this.app = express();
		this.initializeDatabase();
		this.initializeMiddlewares();
		this.initializeControllers(controllers);
		this.initializeAssets();
		this.initializeTemplate();
	}

	private initializeMiddlewares(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	private initializeAssets(): void {
		this.app.use('/', express.static('public'));
		this.app.use(express.static('views'));
	}

	private initializeTemplate(): void {
		this.app.set('view engine', 'pug');
	}

	private initializeControllers(controllers: Controller[]): void {
		this.app.get('/', (req: Request, res: Response): void => {
			return res.redirect('/auth/login');
		});
		controllers.forEach(controller => {
			this.app.use('/', controller.router);
		});
	}

	private async initializeDatabase(): Promise<void> {
		const { DB_HOST, DB_USER, DB_PASSWORD } = process.env;
		await mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}${DB_HOST}`, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		});
		console.log(`Database has connected`);
	}

	public listen(): void {
		this.app.listen(process.env.PORT, () => {
			console.log(`Application listened on port ${process.env.PORT}`);
		});
	}
}
