'use strict';
import { Direction } from 'onoff';
import { gpioController } from '../gpio.js';
import { Pin, PinConfigInput, Pins, PinsConfigInput, PinState } from '../interfaces.js';

export const resolvers = {
  Query: {
    state: (_: unknown, args: Pin): boolean | null => {
      const { pinName } = args;
      const state = gpioController.getPinState(pinName);

      return state !== undefined ? state : null;
    },
    isPinRegistered: (_: unknown, args: Pin): boolean => {
      const { pinName } = args;
      return gpioController.getPin(pinName) !== undefined;
    },
    pinDirection: (_: unknown, args: Pin): Direction | null => {
      const { pinName } = args;
      const pin = gpioController.getPin(pinName);
      if (pin === undefined) return null;
      return pin.direction();
    }
  },
  Mutation: {
    setState: (_: unknown, args: PinState): boolean | null => {
      const { pinName, state } = args;
      const success = gpioController.setPinState(pinName, state);
      return success === undefined ? null : state;
    },
    toggleState: (_: unknown, args: Pin): boolean | null => {
      const { pinName } = args;
      const newState = gpioController.togglePinState(pinName);
      return newState !== undefined ? newState : null;
    },
    registerPin: (_: unknown, args: PinConfigInput): boolean | Error => {
      // console.log(`REG PIN ARGS ${JSON.stringify(args)}`);
      gpioController.registerPin(args.pinConfig);
      return true;
    },
    registerPins: (_: unknown, args: PinsConfigInput): boolean | Error => {
      gpioController.registerPins(args.pinConfigs);
      return true;
    },
    unregisterPin: (_: unknown, args: Pin): boolean | Error => {
      const { pinName } = args;
      gpioController.unregisterPin(pinName);
      return true;
    },
    unregisterPins: (_: unknown, args: Pins): boolean | Error => {
      const { pinNames } = args;
      gpioController.unregisterPins(pinNames);
      return true;
    }
  },
  Direction: {
    IN: 'in',
    OUT: 'out',
  }
};
