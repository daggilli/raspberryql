'use strict';

import { Direction } from "onoff";

export interface Pin {
  pinName: string;
}

export interface Pins {
  pinNames: string[];
}

export interface PinState {
  pinName: string;
  state: boolean;
}

export interface ServerConfig {
  expressPort: number;
  sslKeyPath: string;
  sslCertificatePath: string;
}

export interface PinConfig {
  pinName: string;
  direction: Direction
}

export interface PinConfigInput {
  pinConfig: PinConfig
}

export interface PinsConfigInput {
  pinConfigs: PinConfig[]
}
