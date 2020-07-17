"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrependCommand = void 0;
const StoreCommand_1 = require("./StoreCommand");
const utils_1 = require("../lib/utils");
class PrependCommand extends StoreCommand_1.StoreCommand {
    constructor(line, messageParser, cache) {
        super(line, messageParser, cache);
    }
    isValidItem(key, item) {
        return this.cache.has(key);
    }
    /**
     * Update the existing data in cache with the new sent data
     * added to the beginning
     *
     * @param message string
     */
    updateMessage(message) {
        const [command, key] = this.line;
        const item = this.cache.get(utils_1.cleanText(key));
        const newMessage = message + item.getMessage();
        this.message = utils_1.cleanText(newMessage);
        this.updateBytes(this.message.length.toString());
    }
}
exports.PrependCommand = PrependCommand;
