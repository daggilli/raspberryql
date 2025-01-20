'use strict';
export const KERNEL_GPIO_DEBUG_PATH = "/sys/kernel/debug/gpio";
export const LOCAL_GPIO_DEBUG_PATH = "./kernel_gpio.txt";
export const PINMATCHER = /^\sgpio-(\d+)\s\((\w+)\s*.*\).*/;
