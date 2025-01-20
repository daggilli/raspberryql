'use strict';
import { gpioController } from '../gpio.js';
import { LedState } from '../interfaces.js';
import { LED_PIN } from '../pinConfig.js';

export const resolvers = {
  Query: {
    state: (): boolean | null => {
      const state = gpioController.getPinState(LED_PIN);

      return state !== undefined ? state : null;
    },
  },
  Mutation: {
    setState: (_: unknown, args: LedState): boolean => {
      const { state } = args;
      gpioController.setPinState(LED_PIN, state);
      return Boolean(state);
    },
    toggleState: (): boolean | null => {
      const newState = gpioController.togglePinState(LED_PIN);
      return newState !== undefined ? newState : null;
    }
  }
};
