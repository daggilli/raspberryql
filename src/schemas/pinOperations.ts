'use strict';

export const typeDefs = `#graphql
  enum Direction {
    IN
    OUT
  }

  input PinConfiguration {
    pinName: String!
    direction: Direction!
  }

  extend type Query {
    state(pinName: String!): Boolean
    isPinRegistered(pinName: String!): Boolean
    pinDirection(pinName: String!): Direction
  }

  extend type Mutation {
    setState(pinName: String!, state: Boolean!): Boolean
    toggleState(pinName: String!): Boolean
    registerPin(pinConfig: PinConfiguration!): Boolean
    registerPins(pinConfigs: [PinConfiguration]!): Boolean
    unregisterPin(pinName: String!): Boolean
    unregisterPins(pinNames: [String]!): Boolean
  }
`;