'use strict';

export const typeDefs = `#graphql
  enum Direction {
    IN
    OUT
  }

  extend type Query {
    state(pinName: String!): Boolean
    isPinRegistered(pinName: String!): Boolean
    pinDirection(pinName: String!): Direction
  }

  extend type Mutation {
    setState(pinName: String!, state: Boolean!): Boolean
    toggleState(pinName: String!): Boolean
    registerPin(pinName: String!, direction: Direction!): Boolean
    unregisterPin(pinName: String!): Boolean
  }
`;