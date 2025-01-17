'use strict';
export const typeDefs = `#graphql
  type Book {
    title: String
    author: String
    queryTime: String
  }

  extend type Query {
    books: [Book]
  }
`;
