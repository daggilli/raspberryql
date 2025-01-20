'use strict';
import { Gpio, BinaryValue } from "onoff";
import { PinMapper } from './pinMapper.js';
import { PinConfig } from "./interfaces.js";

const boolToBin = (val: boolean): BinaryValue => val ? 1 : 0;
const binToBool = (val: BinaryValue): boolean => val === 1;
const invertValue = (val: BinaryValue): BinaryValue => val === 0 ? 1 : 0;

class GPIOController {
  private _mapper: PinMapper;
  private _pins: Map<string, Gpio>;

  constructor() {
    console.log("Creating GPIOController");
    this._mapper = new PinMapper();
    this._pins = new Map();
  }

  registerPins(config: PinConfig[]) {
    for (const pin of config) {
      this.registerPin(pin);
    }
  }

  registerPin(config: PinConfig) {
    const pinNumber = this._mapper.pinNumber(config.pinName);
    if (pinNumber) {
      const pin = new Gpio(pinNumber, config.direction);
      this._pins.set(config.pinName, pin);
    }
  }

  unregisterPin(pinName: string) {
    const pin = this.getPin(pinName);
    if (pin) {
      pin.unexport();
    }
  }

  getPin(pinName: string): Gpio | undefined {
    return this._pins.get(pinName);
  }

  getPinState(pinName: string): boolean | undefined {
    let state;
    const pin = this.getPin(pinName);
    if (pin) {
      state = binToBool(pin.readSync());
    }
    return state;
  }

  setPinState(pinName: string, state: boolean) {
    const pin = this.getPin(pinName);
    if (pin) {
      pin.writeSync(boolToBin(state));
    }
  }

  togglePinState(pinName: string): boolean | undefined {
    const pin = this.getPin(pinName);
    if (!pin) return undefined;

    const curState = pin.readSync();
    if (curState !== undefined) {
      pin.writeSync(invertValue(curState));
      return binToBool(curState);
    }
  }

  shutdown() {
    for (const pin of [...this._pins.values()]) {
      if (pin.direction()) {
        pin.writeSync(0);
      }
      pin.unexport();
    }
  }
}

export const gpioController = new GPIOController();
