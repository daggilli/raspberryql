'use strict';
import { gpioController } from '../gpio.js';
import { LedState } from '../interfaces.js';

const LED_PIN = 'GPIO21';

export const resolvers = {
  Query: {
    state: (): boolean | null => {
      const state = gpioController.getPinState(LED_PIN);

      return state !== undefined ? state : null;
    },
  },
  Mutation: {
    setState: (_: unknown, args: LedState): boolean => {
      console.log(args);
      const { state } = args;
      console.log(`setState ${state}`);
      gpioController.setPinState(LED_PIN, state);
      return Boolean(state);
    },
    toggleState: (): boolean | null => {
      const newState = gpioController.togglePinState(LED_PIN);
      return newState !== undefined ? newState : null;
    }
  }
};
