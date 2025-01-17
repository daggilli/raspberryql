'use strict';
import { Book } from '../interfaces.js';
import { books } from '../data.js';

export const resolvers = {
  Query: {
    books: () => books.map((b: Book) => {
      b.queryTime = new Date().toISOString();
      return b;
    }),
  }
};