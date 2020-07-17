"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplaceCommand = void 0;
const StoreCommand_1 = require("./StoreCommand");
class ReplaceCommand extends StoreCommand_1.StoreCommand {
    constructor(line, messageParser, cache) {
        super(line, messageParser, cache);
    }
    /**
     * Will only store the data if item with the given key
     * already exists in cache
     *
     * @param key string
     * @param item IItem
     */
    isValidItem(key, item) {
        return this.cache.has(key);
    }
}
exports.ReplaceCommand = ReplaceCommand;
