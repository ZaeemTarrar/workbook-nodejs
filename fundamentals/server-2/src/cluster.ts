'usestrict';
import express, { Express, Request, Response, NextFunction, RequestHandler } from 'express';
import responseTime from 'response-time';
import axios from 'axios';
import redis, { RedisClient } from 'redis';
import http, { Server } from 'http';
import https from 'https';
import cluster from 'cluster';
const numCPUs = require('os').cpus().length;
const { MyServer, Http2 }: any = require('./configurations/index');
const client: RedisClient = redis.createClient();
const { logger }: any = require('./utils/logHelpers/index');
const { fork }: any = require('child_process');
var app: Express = express();

app.use(responseTime());

const childFork: any = fork('./src/forks/child.ts');

if (cluster.isPrimary) {
	console.log(`Primary ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
	});
} else {
	const getBook: RequestHandler = (req: Request, res: Response, next: NextFunction): Promise<void> => {
		let isbn: string = <string>req.query.isbn;
		let url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
		return axios
			.get(url)
			.then((response) => {
				let book = response.data.items;
				client.setex(isbn, 60 * 60, JSON.stringify(book));
				res.send(book);
			})
			.catch((err) => {
				res.send('The book you are looking for is not found !!!');
			});
	};

	const getCache: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
		let isbn: string = <string>req.query.isbn;
		client.get(isbn, (err, result) => {
			if (result) {
				res.send(result);
			} else {
				getBook(req, res, next);
			}
		});
	};

	app.get('/book', getCache);
	app.get('/', (req: Request, res: Response, next: NextFunction) => {
		childFork.send(29);
		childFork.on('message', (message: any): void => {
			console.log(`Message from child.js: ${message}`);
			res.json('Ok');
		});
	});

	const server: Server = !MyServer.Secure ? http.createServer(app) : https.createServer(Http2.Options, app);

	server.listen(MyServer.Port, MyServer.IpAddress, () => {
		console.log(
			`${MyServer.Secure
				? 'Secure'
				: null} Server is Listening ${MyServer.Protocol}://${MyServer.IpAddress}:${MyServer.Port}/ !!!`
		);
	});

	console.log(`Worker ${process.pid} started`);
}
