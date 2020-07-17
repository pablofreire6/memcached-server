"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppendCommand = void 0;
const StoreCommand_1 = require("./StoreCommand");
const utils_1 = require("../lib/utils");
class AppendCommand extends StoreCommand_1.StoreCommand {
    constructor(line, messageParser, cache) {
        super(line, messageParser, cache);
    }
    /**
     * Can add data only if a given key already exists in cache
     *
     * @param key string
     * @param item IItem
     *
     * @return boolean
     */
    isValidItem(key, item) {
        return this.cache.has(key);
    }
    /**
     * Update the existing data in cache with the new sent data
     * added to the end
     *
     * @param message string
     */
    updateMessage(message) {
        const [command, key] = this.line;
        const item = this.cache.get(utils_1.cleanText(key));
        const newMessage = item.getMessage() + message;
        this.message = utils_1.cleanText(newMessage);
        this.updateBytes(this.message.length.toString());
    }
}
exports.AppendCommand = AppendCommand;
