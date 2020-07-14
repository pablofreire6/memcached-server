"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppendCommand = void 0;
const StoreCommand_1 = require("./StoreCommand");
const utils_1 = require("../lib/utils");
class AppendCommand extends StoreCommand_1.StoreCommand {
    constructor(line, messageParser, cache) {
        super(line, messageParser, cache);
    }
    isValid(key, item) {
        return this.cache.has(key);
    }
    // implemen doSave()
    updateMessage(message) {
        const [command, key] = this.line;
        const item = this.cache.get(utils_1.cleanText(key));
        const newMessage = item.getMessage() + message;
        this.message = utils_1.cleanText(newMessage);
    }
}
exports.AppendCommand = AppendCommand;
