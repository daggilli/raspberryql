'use strict';
import fs from 'fs';
import { ServerConfig } from './interfaces.js';
import { DEFAULT_SERVER_CONFIG_PATH } from './constants.js';

export const loadObject: <T>(filename: string) => T = (filename: string) => JSON.parse(fs.readFileSync(filename, 'utf-8'));
export const loadConfigFile = (configPath?: string): ServerConfig => loadObject<ServerConfig>(configPath || DEFAULT_SERVER_CONFIG_PATH);
