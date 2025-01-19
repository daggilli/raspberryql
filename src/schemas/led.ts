'use strict';
export const typeDefs = `#graphql
  extend type Query {
    state: Boolean
  }

  extend type Mutation {
    setState(state: Boolean!): Boolean
    toggleState: Boolean
  }
`;