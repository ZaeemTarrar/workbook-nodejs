'usestrict';
import { red, green, blue, cyan, magenta, yellow, bold, gray } from 'colors';
import express, { Express, Request, Response, NextFunction, RequestHandler } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import responseTime from 'response-time';
import axios from 'axios';
import redis, { RedisClient } from 'redis';
import http, { Server } from 'http';
import https from 'https';
import morgan from 'morgan';
import path from 'path';
import compression from 'compression';
// import respond from 'express-respond';
var EventEmitter: any = require('events');
const rfs = require('rotating-file-stream');
const numCPUs = require('os').cpus().length;
const { MyServer, Http2, Session }: any = require('./configurations/index');
const client: RedisClient = redis.createClient();
const { logger }: any = require('./utils/logHelpers/index');
const { fork }: any = require('child_process');
var requestStats = require('request-stats');
// import logger from 'express-logger';
const Socket: any = require('socket.io');
import { NOT_FOUND, INTERNAL_SERVER_ERROR, OK } from 'http-status';
// const logger = morgan('combined');
// const { MongoConnection }: any = require('./database/mongoose/connection');
// const { PORT, IP, ClearLogsOnEveryStartup, SESSION_SECRET, Mode }: any = require('./configurations/index');
// const { R, R2 }: any = require('./utils/response');
// const { ClearLogs }: any = require('./utils/logs');
// const Wait: Function = require('./utils/wraps');
// const { RedisConnection, setSession, getSession }: any = require('./storage/redis-client');

var events = new EventEmitter();
events.on('message', (text: any) => {
	console.log(text);
});
events.on('ping', (data: any) => {
	console.log('First event: ' + data);
});
// events.emit('message', 'hello world');

var app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	session({
		secret: Session.Secret,
		saveUninitialized: false,
		resave: false
	})
);
app.use(cors());

app.use(responseTime());
// app.use(respond);
app.use(compression());

const accessLogStream = rfs.createStream('access.log', {
	interval: '1d',
	path: path.join(__dirname, 'log')
});
app.use(morgan('combined', { stream: accessLogStream }));

const childFork: any = fork('./src/forks/child.ts');

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

requestStats(server, function(stats: any) {});

server.listen(MyServer.Port, MyServer.IpAddress, () => {
	console.log(
		`${MyServer.Secure
			? 'Secure'
			: null} Server is Listening ${MyServer.Protocol}://${MyServer.IpAddress}:${MyServer.Port}/ !!!`
	);
});
