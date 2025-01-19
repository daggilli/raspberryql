import { typeDefs as ledTypes } from './led.js';

const baseTypeDefs = `
  type Query
  type Mutation
`;

export const typeDefs = [
  baseTypeDefs,
  ledTypes,
];