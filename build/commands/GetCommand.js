"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCommand = void 0;
const utils_1 = require("../lib/utils");
class GetCommand {
    constructor(line, messageParser, cache) {
        this.line = line;
        this.messageParser = messageParser;
        this.cache = cache;
    }
    /**
     * Read the keys and search for stored data for each one
     *
     * @return string
     */
    run() {
        const [command, ...keys] = this.line;
        const result = this.findByKeys(keys);
        return this.parseMessage(result);
    }
    /**
     * Get parsed result for "get" command that will be sent to client
     *
     * @param result string[]
     *
     * @return string
     */
    parseMessage(result) {
        return this.messageParser.parseGet(result);
    }
    /**
     * Given a list of keys it will return all the items found for them
     *
     * @param keys string[]
     */
    findByKeys(keys) {
        const result = [];
        keys.forEach((key) => {
            const keyText = utils_1.cleanText(key);
            if (this.cache.has(keyText)) {
                const item = this.cache.get(keyText);
                if (item) {
                    result.push(item);
                }
            }
        });
        return result;
    }
}
exports.GetCommand = GetCommand;
