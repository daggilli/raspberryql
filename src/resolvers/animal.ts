'use strict';
import { animals } from '../data.js';

export const resolvers = {
  Query: {
    animals: () => animals,
  }
};