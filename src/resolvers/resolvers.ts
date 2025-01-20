'use strict';
import { mergeResolvers } from '@graphql-tools/merge';
import { resolvers as ledResolvers } from './pinOperations.js';

const resolvers = mergeResolvers([
  ledResolvers,
]);

export { resolvers };