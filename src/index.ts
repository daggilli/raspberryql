'use strict';
import { typeDefs } from './schemas/index.js';
import { resolvers } from './resolvers/resolvers.js';
import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import express, { Express } from "express";
import { expressMiddleware } from '@apollo/server/express4';
import https from 'https';
import fs from 'fs';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const expressPort = 4000;

(async () => {
  const app: Express = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });


  await server.start();

  app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server),
  );

  const httpServer = https.createServer(
    {
      key: fs.readFileSync(`./ssl/selfsigned.key`),
      cert: fs.readFileSync(`./ssl/selfsigned.crt`),
      requestCert: false,
      rejectUnauthorized: false,
    },
    app,
  );

  await new Promise<void>((resolve) => httpServer.listen({
    port: expressPort
  }, resolve));

  console.log(`🚀 Server ready at https://localhost:${expressPort}/`);
})();