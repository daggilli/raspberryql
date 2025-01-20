'use strict';
import fs from 'fs';
import {
  LOCAL_GPIO_DEBUG_PATH,
  KERNEL_GPIO_DEBUG_PATH,
  PINMATCHER,
} from './gpioConstants.js';

export class PinMapper {
  private pinMap: Map<string, number>;
  private kernelpins: string[] = [];

  public constructor(private useKernelFile: boolean = true) {
    this.pinMap = new Map();
  }

  public pinNumber(name: string): number | undefined {
    if (this.kernelpins.length === 0) {
      const filePath = this.useKernelFile ? KERNEL_GPIO_DEBUG_PATH : LOCAL_GPIO_DEBUG_PATH;
      try {
        this.kernelpins = fs.readFileSync(filePath, 'utf-8').split('\n');
      } catch (err) {
        console.error(err);
        throw err;
      }
    }

    let boardPin = this.pinMap.get(name);
    if (!boardPin) {
      for (const line of this.kernelpins) {
        if (line.includes(name)) {
          const pinmatch = line.match(PINMATCHER);
          if (pinmatch && pinmatch.length > 2) {
            boardPin = Number(pinmatch[1]);
            this.pinMap.set(name, boardPin);
          }
          break;
        }
      }
    }

    return boardPin;
  }
};
