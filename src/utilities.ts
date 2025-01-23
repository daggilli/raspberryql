'use strict';
import fs from 'fs';

export const loadObject: <T>(filename: string) => T = (filename: string) => JSON.parse(fs.readFileSync(filename, 'utf-8'));
export const fileReadable = (filename: string): boolean => {
  let readable = false;
  try {
    fs.accessSync(filename, fs.constants.R_OK);
    readable = true;
  } catch {
    //
  }

  return readable;
};