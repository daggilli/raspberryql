'use strict';
import { Gpio } from "onoff";

import { initialiseGPIO, setLedState, getLedState, toggleState } from '../gpio.js';
import { LedState } from '../interfaces.js';

const led: Gpio = initialiseGPIO();

export const resolvers = {
  Query: {
    state: (): LedState => ({ state: getLedState(led) }),
  },
  Mutation: {
    setState: (_: unknown, args: LedState): boolean => {
      console.log(args);
      const { state } = args;
      console.log(`setState ${state}`);
      setLedState(led, state);
      return Boolean(state);
    },
    toggleState: (): boolean => {
      return toggleState(led);
    }
  }
};
