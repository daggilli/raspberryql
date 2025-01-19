'use strict';
import { mergeResolvers } from '@graphql-tools/merge';
import { resolvers as animalResolvers } from './animal.js';
import { resolvers as bookResolvers } from './book.js';
import { resolvers as ledResolvers } from './led.js';

const resolvers = mergeResolvers([
  animalResolvers,
  bookResolvers,
  ledResolvers,
]);

export { resolvers };