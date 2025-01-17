'use strict';
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
import { books } from './data.js';

export const resolvers = {
  Query: {
    books: () => books,
  },
};