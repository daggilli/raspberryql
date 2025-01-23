'use strict';
import { typeDefs } from './schemas/index.js';
import { resolvers } from './resolvers/resolvers.js';
import { gpioController } from './gpio.js';
import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import express, { Express } from "express";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import https from 'https';
import fs from 'fs';
import { ServerConfig } from './interfaces.js';
import { loadPinsConfig, loadServerConfig } from './configLoader.js';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const serverConfig: ServerConfig = loadServerConfig();
const defaultPins = loadPinsConfig();

if (defaultPins?.length) {
  gpioController.registerPins(defaultPins);
}

(async () => {
  const app: Express = express();

  const httpsServer = https.createServer(
    {
      key: fs.readFileSync(serverConfig.sslKeyPath),
      cert: fs.readFileSync(serverConfig.sslCertificatePath),
      requestCert: false,
      rejectUnauthorized: false,
    },
    app,
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer: httpsServer }),
      {
        async serverWillStart() {
          return {
            async serverWillStop() {
              gpioController.shutdown();
            }
          };
        }
      }
    ],
  });


  await server.start();

  app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server),
  );

  await new Promise<void>((resolve) => httpsServer.listen({
    port: serverConfig.expressPort
  }, resolve));

  console.log(`🚀 Server ready at https://localhost:${serverConfig.expressPort}/`);
})();
