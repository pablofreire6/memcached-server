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
        return this.messageParser.parseGet(result);
    }
}
exports.GetCommand = GetCommand;
