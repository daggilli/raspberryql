'use strict';
import { gpioController } from '../gpio.js';
import { PinState } from '../interfaces.js';

export const resolvers = {
  Query: {
    state: (_: unknown, args: PinState): boolean | null => {
      const { pinName } = args;
      const state = gpioController.getPinState(pinName);

      return state !== undefined ? state : null;
    },
  },
  Mutation: {
    setState: (_: unknown, args: PinState): boolean => {
      const { pinName, state } = args;
      gpioController.setPinState(pinName, state);
      return Boolean(state);
    },
    toggleState: (_: unknown, args: PinState): boolean | null => {
      const { pinName, } = args;
      const newState = gpioController.togglePinState(pinName);
      return newState !== undefined ? newState : null;
    }
  }
};
