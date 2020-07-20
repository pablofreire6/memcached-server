"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrependCommand = void 0;
const utils_1 = require("../lib/utils");
const AppendCommand_1 = require("./AppendCommand");
class PrependCommand extends AppendCommand_1.AppendCommand {
    constructor(line, messageParser, cache) {
        super(line, messageParser, cache);
    }
    isValidItem(key, item) {
        return this.cache.has(key);
    }
    getMessageUpdated(message, item) {
        return utils_1.cleanText(message) + item.getMessage();
    }
}
exports.PrependCommand = PrependCommand;
