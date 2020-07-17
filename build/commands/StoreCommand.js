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
        this.LINE_PARAMS_COUNT = 5;
        this.line = line;
        this.messageParser = messageParser;
        this.cache = cache;
    }
    /**
     * It will process the command, validate and wait for the data to store in cache
     *
     * @return string
     */
    run() {
        Logger_1.Logger.log('MESSAGE', this.message);
        let item = this.createItem();
        const [command, key] = this.line;
        if (!this.isValidItem(key, item)) {
            throw new Error(ErrorMessage_1.NOTSTORED);
        }
        this.doSave(key, item);
        return this.messageParser.parseSet();
    }
    updateBytes(bytes) {
        this.line[4] = bytes;
    }
    /**
     * set the message that will be stored in cache
     *
     * @param message string
     */
    updateMessage(message) {
        this.message = utils_1.cleanText(message);
    }
    /**
     * Save the item with the given key in the cache
     *
     * @param key string
     * @param item IItem
     */
    doSave(key, item) {
        this.cache.add(key, item);
    }
    /**
     * It will add the validations needed it should be overriden
     * by concrete implementations
     *
     * @param key string
     * @param item IItem
     *
     * @return boolean
     */
    isValidItem(key, item) {
        return true;
    }
    validateLine() {
        if (this.line.length !== this.LINE_PARAMS_COUNT) {
            throw new Error(ErrorMessage_1.ERROR);
        }
        const [command, key, flags, exptime, bytes] = this.line;
        const validateParams = () => {
            return isNaN(parseInt(flags, 10)) || isNaN(parseInt(utils_1.cleanText(bytes), 10)) || isNaN(parseInt(exptime, 10));
        };
        if (validateParams()) {
            throw new Error(ErrorMessage_1.CLIENTERRORBADFORMAT);
        }
        if (!this.message.length) {
            throw new Error(ErrorMessage_1.CONTINUE);
        }
        if (parseInt(utils_1.cleanText(bytes), 10) !== this.message.length) {
            throw new Error(ErrorMessage_1.CLIENTERROR);
        }
    }
    createItem() {
        const [command, key, flags, exptime, bytes] = this.line;
        this.validateLine();
        let item = new Item_1.Item();
        item.setKey(key);
        item.setFlags(parseInt(flags, 10));
        item.setExpirationTime(parseInt(exptime, 10));
        item.setBytes(parseInt(utils_1.cleanText(bytes), 10));
        item.setMessage(this.message);
        return item;
    }
}
exports.StoreCommand = StoreCommand;
