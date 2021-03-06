"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CasCommand = void 0;
const StoreCommand_1 = require("./StoreCommand");
const utils_1 = require("../lib/utils");
const ErrorMessage_1 = require("../lib/ErrorMessage");
class CasCommand extends StoreCommand_1.StoreCommand {
    constructor(line, messageParser, cache) {
        super(line, messageParser, cache);
        this.LINE_PARAMS_COUNT = 6;
    }
    encodeCas() {
        return utils_1.uniqueId();
    }
    validateLine() {
        super.validateLine();
        const [command, key, flags, exptime, bytes, casId] = this.line;
        let item = this.cache.get(key);
        if (!item) {
            throw new Error(ErrorMessage_1.NOTFOUND);
        }
        if (item && parseInt(casId, 10) !== item.getCasId()) {
            throw new Error(ErrorMessage_1.EXISTS);
        }
    }
}
exports.CasCommand = CasCommand;
