"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreCommand = void 0;
const ErrorMessage_1 = require("../lib/ErrorMessage");
const utils_1 = require("../lib/utils");
const Item_1 = require("../lib/Item");
const Logger_1 = require("../lib/Logger");
class StoreCommand {
    constructor(line, messageParser, cache) {
        this.message = '';
        this.line = line;
        this.messageParser = messageParser;
        this.cache = cache;
    }
    run() {
        Logger_1.Logger.log('MESSAGE', this.message);
        if (this.line.length !== 5) {
            throw new Error(ErrorMessage_1.ERROR);
        }
        const [command, key, flags, exptime, bytes] = this.line;
        if (!this.message.length) {
            return 'continue';
        }
        else if (parseInt(utils_1.cleanText(bytes), 10) !== this.message.length) {
            throw new Error(ErrorMessage_1.CLIENTERROR);
        }
        if (isNaN(parseInt(flags, 10)) || isNaN(parseInt(utils_1.cleanText(bytes), 10)) || isNaN(parseInt(exptime, 10))) {
            throw new Error(ErrorMessage_1.CLIENTERRORBADFORMAT);
        }
        let item = new Item_1.Item();
        item
            .setKey(key)
            .setFlags(parseInt(flags, 10))
            .setExpirationTime(parseInt(exptime, 10))
            .setBytes(parseInt(utils_1.cleanText(bytes), 10))
            .setMessage(this.message);
        if (!this.isValid(key, item)) {
            throw new Error(ErrorMessage_1.NOTSTORED);
        }
        this.doSave(key, item);
        this.message = '';
        return this.messageParser.parseSet();
    }
    updateMessage(message) {
        this.message = utils_1.cleanText(message);
    }
    doSave(key, item) {
        this.cache.add(key, item);
    }
    isValid(key, item) {
        return true;
    }
}
exports.StoreCommand = StoreCommand;
