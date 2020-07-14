"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetCommand = void 0;
const StoreCommand_1 = require("./StoreCommand");
class SetCommand extends StoreCommand_1.StoreCommand {
    constructor(line, messageParser, cache) {
        super(line, messageParser, cache);
    }
}
exports.SetCommand = SetCommand;
