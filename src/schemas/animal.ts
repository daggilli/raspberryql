'use strict';
export const typeDefs = `#graphql
  type Animal {
    species: String
    name: String
    age: Int
  }

  extend type Query {
    animals: [Animal]
  }
`;
