"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplaceCommand = void 0;
const StoreCommand_1 = require("./StoreCommand");
class ReplaceCommand extends StoreCommand_1.StoreCommand {
    constructor(line, messageParser, cache) {
        super(line, messageParser, cache);
    }
    isValid(key, item) {
        return this.cache.has(key);
    }
}
exports.ReplaceCommand = ReplaceCommand;
