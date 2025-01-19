'use strict';
export const typeDefs = `#graphql
  type LedState {
    state: Boolean
  }

  extend type Query {
    state: LedState
  }

  extend type Mutation {
    setState(state: Boolean!): Boolean
    toggleState: Boolean
  }
`;