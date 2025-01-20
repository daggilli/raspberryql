'use strict';

import { PinConfig } from "./interfaces.js";

export const LED_PIN = 'GPIO21';
export const PINS: PinConfig[] = [
  {
    pinName: LED_PIN,
    direction: 'out',
  },
];
