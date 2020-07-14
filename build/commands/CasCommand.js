"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CasCommand = void 0;
const StoreCommand_1 = require("./StoreCommand");
class CasCommand extends StoreCommand_1.StoreCommand {
    constructor(line, messageParser, cache) {
        super(line, messageParser, cache);
    }
    encodeCas() {
        let buff = new Buffer(this.message);
        return buff.toString('base64');
    }
}
exports.CasCommand = CasCommand;
