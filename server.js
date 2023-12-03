import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';
import consturctSocket from './module/socket/index.ts';


async function getModulesDefinitions(
  modulesPath,
  specificRoute,
  doRequire = true
) {
  const files = await fs.promises.readdir(modulesPath);
  const parseRoute = (/** @type {string} */ fileName) =>
    specificRoute && fileName in specificRoute
      ? specificRoute[fileName]
      : `/${fileName.replace(/\.ts$/i, '').replace(/_/g, '/')}`;

  const modules = files
    .reverse()
    .filter((file) => file.endsWith('.ts'))
    .map((file) => {
      const identifier = file.split('.').shift();
      const route = parseRoute(file);
      const modulePath = path.join(modulesPath, file);
      const module = doRequire ? require(modulePath) : modulePath;

      return { identifier, route, module };
    });

  return modules;
}

async function consturctServer() {
  const port = 3000;
  const app = express();
  const { CORS_ALLOW_ORIGIN } = process.env;
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });
  app.set('trust proxy', true);

  app.use((req, res, next) => {
    if (!req.path.includes('.')) {
      res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin':
          CORS_ALLOW_ORIGIN || req.headers.origin || '*',
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/json; charset=utf-8',
      });
    }
    req.method === 'OPTIONS' ? res.status(204).end() : next();
  });

  /**
   * Load every modules in this directory
   */
  (async () => {
    const moduleDefinitions = await getModulesDefinitions(
      path.join(__dirname, 'module'),
      {}
    );
    for (const moduleDef of moduleDefinitions) {
      app.use(moduleDef.route, (req, res) => moduleDef.module(req, res, io));
    }
  })();

  consturctSocket(io);
  httpServer.listen(port);
}

async function serveNcmApi() {
  consturctServer();
}

module.exports = {
  serveNcmApi
};
