import { red, green, blue, cyan, magenta, yellow, bold, gray } from 'colors';
import express from 'express';
import session from 'express-session';
// import logger from 'express-logger'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import redis from 'redis';
import http from 'http';
import morgan from 'morgan';
import { NOT_FOUND, INTERNAL_SERVER_ERROR, OK } from 'http-status';
const logger = morgan('combined');
const { sequelize } = require('./database/sequelize');
const { PORT, IP, CreateDb, RefreshDb, SeedDb, RemoveDb } = require('./configurations/index');
const R = require('./utils/response');
// const { fire } = require('./fire')

const app = express();

/**
 * Contracts and Types
 */
import { T_Nature } from './contracts/model/nature';

/**
 * Model Imports
 */
const Nature = require('./models/nature');

/**
 * Seeder Methods
 */
const { Seeder } = require('./seeds/index');

/**
 * Middleware Imports
 */
// const auth = require('./middlewares/auth/index');
const mainGate = require('./middlewares/mainGate/index');

/**
 * Router Imports
 */
const NatureRouter = require('./routes/nature');

// app.use(logger)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	session({
		secret: '123456',
		saveUninitialized: false,
		resave: false
	})
);
app.use(cors());

/**
 * Middleware Integration
 */
app.use(mainGate);

/**
 * Main Routes
 */
app.use('/nature', NatureRouter);

/**
 * Regular Routes
 */
app.use('/test', (req, res, next) => {
	res.json(R(OK, 'Application is Running Perfectly'));
});

app.use('/', (req, res, next) => {
	res.json(R(NOT_FOUND, null));
});

app.use((req, res, next) => {
	res.json(R(INTERNAL_SERVER_ERROR, null));
});

const Chain = new Promise<void>((resolve, reject) => resolve());
Chain.then((): void => {
	console.clear();
})
	.then((): void => {
		if (RemoveDb) {
			console.log(red(`\nRemoving All Tables from Database`));
			return sequelize.drop();
		}
	})
	.then((): void => {
		// Relation Definitions
	})
	.then((): void => {
		// Database Creation / Refreshing / Seeding
		if (CreateDb) {
			return sequelize
				.sync({ force: RefreshDb })
				.then((result: any) => {
					console.log(blue(`\nSQL Database Connected`));
					if (RefreshDb) {
						console.log(blue(`SQL Database Refreshed`));
					}
				})
				.then((): any => {
					if (SeedDb) {
						return Seeder();
					}
				})
				.catch((err: Error): void => {
					console.log(red('Sequelize Error: '), gray(JSON.stringify(err.message, null, 2)));
				});
		} else {
			return;
		}
	})
	.then((): void => {
		// Main Server
		const server: http.Server = http.createServer(app);
		server.listen(PORT, (): void => {
			console.log(bold(green(`\nApplication Started at ${red(IP)}:${blue(PORT)}`)));
		});
	})
	.catch((err: Error) => {
		console.log(bold(red(`Server Error: `)), bold(gray(JSON.stringify(err, null, 2))));
	});
