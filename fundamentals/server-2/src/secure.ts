'usestrict';

import express, { Express, Request, Response, NextFunction, RequestHandler } from 'express';
import responseTime from 'response-time';
import axios from 'axios';
import redis, { RedisClient } from 'redis';
import http2, { Http2SecureServer } from 'http2';
import fs from 'fs';
const { MyServer, Http2 }: any = require('./configurations/index');

const server: Http2SecureServer = http2.createSecureServer(Http2.Options);

server.on('stream', (stream: any, headers: any) => {
	stream.respond({
		'content-type': 'text/html; charset=utf-8',
		status: 200
	});
	stream.on('error', (error: Error) => console.error(error));
	stream.end('<h1>Hello World</h1>');
});

server.listen(MyServer.Port, MyServer.IpAddress, () => {
	console.log(`Server running at https://${MyServer.IpAddress}:${MyServer.Port}/ !!!`);
});
