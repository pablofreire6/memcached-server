/* istanbul ignore file */

import { DEBUG } from '../config/config';

export class Logger {
  static log(key, message) {
    if (DEBUG) {
      console.log(`------------${key}-----------------`);
      console.log(message);
      console.log(`------------${key}-----------------`);
    }
  }
}
