import { typeDefs as bookTypes } from './book.js';
import { typeDefs as animalTypes } from './animal.js';
import { typeDefs as ledTypes } from './led.js';

const baseTypeDefs = `
  type Query
  type Mutation
`;

export const typeDefs = [
  baseTypeDefs,
  bookTypes,
  animalTypes,
  ledTypes,
];