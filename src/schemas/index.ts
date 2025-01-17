import { typeDefs as bookTypes } from './book.js';
import { typeDefs as animalTypes } from './animal.js';

const baseTypeDefs = `
  type Query
`;

export const typeDefs = [
  baseTypeDefs,
  bookTypes,
  animalTypes,
];