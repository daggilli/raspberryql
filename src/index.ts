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

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const expressPort = 4000;

gpioController.registerPin('GPIO21', 'out');

(async () => {
  const app: Express = express();

  const httpsServer = https.createServer(
    {
      key: fs.readFileSync(`./ssl/selfsigned.key`),
      cert: fs.readFileSync(`./ssl/selfsigned.crt`),
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
    port: expressPort
  }, resolve));

  console.log(`🚀 Server ready at https://localhost:${expressPort}/`);
})();