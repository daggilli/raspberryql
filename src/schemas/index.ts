import { typeDefs as ledTypes } from './pinOperations.js';

const baseTypeDefs = `
  type Query
  type Mutation
`;

export const typeDefs = [
  baseTypeDefs,
  ledTypes,
];