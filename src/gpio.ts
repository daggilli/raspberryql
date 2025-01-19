'use strict';
import { Gpio, BinaryValue, Direction } from "onoff";
import { PinMapper } from 'pinmapper';

const boolToBin = (val: boolean): BinaryValue => val ? 1 : 0;
const binToBool = (val: BinaryValue): boolean => val === 1;
const invertValue = (val: BinaryValue): BinaryValue => val === 0 ? 1 : 0;

class GPIOController {
  private _mapper: PinMapper;
  private _pins: Map<string, Gpio>;

  constructor() {
    console.log("GIPPER CTOR");
    this._mapper = new PinMapper();
    this._pins = new Map();
  }

  registerPin(pinName: string, direction: Direction) {
    const pinNumber = this._mapper.pinNumber(pinName);
    if (pinNumber) {
      const pin = new Gpio(pinNumber, direction);
      this._pins.set(pinName, pin);
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
    console.log(`SET PIN ${pinName} ${state}`);
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
