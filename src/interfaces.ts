'use strict';

import { Direction } from "onoff";

export interface Book {
  title: string;
  author: string;
  queryTime?: string;
}

export interface Animal {
  species: string;
  name: string;
  age: number;
}

export interface LedState {
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
