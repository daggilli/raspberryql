'use strict';

import { DEFAULT_PINS_CONFIG_PATH, DEFAULT_SERVER_CONFIG_PATH } from "./constants.js";
import { PinConfig, ServerConfig } from "./interfaces.js";
import { loadObject } from "./utilities.js";

export const loadServerConfig = (configPath?: string): ServerConfig => loadObject<ServerConfig>(configPath || DEFAULT_SERVER_CONFIG_PATH);
export const loadPinsConfig = (configPath?: string): PinConfig[] | undefined => {
  let config: PinConfig[] | undefined;
  try {
    config = loadObject<PinConfig[]>(configPath || DEFAULT_PINS_CONFIG_PATH);
  } catch (err) {
    console.error(err);
  }

  return config;
};