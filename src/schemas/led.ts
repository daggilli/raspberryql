'use strict';
export const typeDefs = `#graphql
  extend type Query {
    state(pinName: String!): Boolean
  }

  extend type Mutation {
    setState(pinName: String!, state: Boolean!): Boolean
    toggleState(pinName: String!): Boolean
  }
`;