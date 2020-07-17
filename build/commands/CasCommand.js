"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CasCommand = void 0;
const StoreCommand_1 = require("./StoreCommand");
const utils_1 = require("../lib/utils");
class CasCommand extends StoreCommand_1.StoreCommand {
    constructor(line, messageParser, cache) {
        super(line, messageParser, cache);
        this.LINE_PARAMS_COUNT = 6;
    }
    encodeCas() {
        return utils_1.encodeMessage(this.message);
    }
    validateLine() {
        super.validateLine();
        const [command, key, flags, exptime, bytes, casId] = this.line;
        let item = this.cache.get(key);
        if (item && utils_1.cleanText(casId) !== utils_1.encodeMessage(item.getMessage())) {
            throw new Error('EXISTS\r\n');
        }
    }
}
exports.CasCommand = CasCommand;
