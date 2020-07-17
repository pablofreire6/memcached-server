"use strict";
/* istanbul ignore file */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const config_1 = require("../config/config");
class Logger {
    static log(key, message) {
        if (config_1.DEBUG) {
            console.log(`------------${key}-----------------`);
            console.log(message);
            console.log(`------------${key}-----------------`);
        }
    }
}
exports.Logger = Logger;
