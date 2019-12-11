import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose, { mongo } from 'mongoose';
import 'dotenv/config';

export default class App {
	public app: express.Application;
	constructor() {
		this.app = express();
		this.initializeDatabase();
		this.initializeMiddlewares();
		this.initializeControllers();
		this.initializeAssets();
		this.initializeTemplate();
	}

	private initializeMiddlewares(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cookieParser());
	}

	private initializeAssets(): void {
		this.app.use('/', express.static('public'));
		this.app.use(express.static('views'));
	}

	private initializeTemplate(): void {
		this.app.set('view engine', 'pug');
	}

	private initializeControllers(): void {
		this.app.get('/', (req, res) => res.render('index'));
	}

	private async initializeDatabase(): Promise<void> {
		const { DB_HOST, DB_USER, DB_PASSWORD } = process.env;
		await mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}${DB_HOST}`, {
			useNewUrlParser: true,
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
