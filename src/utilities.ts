'use strict';
import fs from 'fs';

export const loadObject: <T>(filename: string) => T = (filename: string) => JSON.parse(fs.readFileSync(filename, 'utf-8'));
