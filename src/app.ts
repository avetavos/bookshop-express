import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

export default class App {
	public app;
	constructor(controllers) {
		this.app = express();
		this.initializeDatabase();
		this.initializeMiddlewares();
		this.initializeControllers(controllers);
		this.initializeAssets();
		this.initializeTemplate();
	}

	private initializeMiddlewares() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	private initializeAssets() {
		this.app.use('/', express.static('public'));
		this.app.use(express.static('views'));
	}

	private initializeTemplate() {
		this.app.set('view engine', 'pug');
	}

	private initializeControllers(controllers) {
		this.app.get('/', (req, res) => {
			return res.redirect('/auth/login');
		});
		controllers.forEach(controller => {
			this.app.use('/', controller.router);
		});
	}

	private async initializeDatabase() {
		const { DB_HOST, DB_USER, DB_PASSWORD } = process.env;
		await mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}${DB_HOST}`, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		});
		console.log(`Database has connected`);
	}

	public listen() {
		this.app.listen(process.env.PORT, () => {
			console.log(`Application listened on port ${process.env.PORT}`);
		});
	}
}
