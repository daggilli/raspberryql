'use strict';

import { PinConfig } from "./interfaces.js";

export const LED_PIN = 'GPIO21';
export const SWITCH_PIN = 'GPIO17';
export const PINS: PinConfig[] = [
  {
    pinName: LED_PIN,
    direction: 'out',
  },
  {
    pinName: SWITCH_PIN,
    direction: 'in',
  },
];
