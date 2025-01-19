'use strict';
import { Gpio, BinaryValue } from "onoff";
import { PinMapper } from 'pinmapper';

const boolToBin = (val: boolean): BinaryValue => val ? 1 : 0;
const binToBool = (val: BinaryValue): boolean => val === 1;
const invertValue = (val: BinaryValue): BinaryValue => val === 0 ? 1 : 0;

export const initialiseGPIO = (): Gpio => {
  console.log('Init GPIO');
  const mapper = new PinMapper();
  const ledPin = mapper.pinNumber("GPIO21") as number;
  const led = new Gpio(ledPin, 'out');

  return led;
};

export const getLedState = (led: Gpio): boolean => binToBool(led.readSync());

export const setLedState = (led: Gpio, state: boolean) => {
  led.writeSync(boolToBin(state));
};

export const toggleState = (led: Gpio): boolean => {
  const curState = led.readSync();
  led.writeSync(invertValue(curState));
  return !binToBool(curState);
};
