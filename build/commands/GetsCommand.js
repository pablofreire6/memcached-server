"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetsCommand = void 0;
const GetCommand_1 = require("./GetCommand");
class GetsCommand extends GetCommand_1.GetCommand {
    parseMessage(result) {
        return this.messageParser.parseGet(result, true);
    }
}
exports.GetsCommand = GetsCommand;
