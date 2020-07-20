"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetsCommand = void 0;
const GetCommand_1 = require("./GetCommand");
class GetsCommand extends GetCommand_1.GetCommand {
    /**
     * Get parsed result for "gets" command that will be sent to client
     *
     * @param result string[]
     *
     * @return string
     */
    parseMessage(result) {
        return this.messageParser.parseGet(result, true);
    }
}
exports.GetsCommand = GetsCommand;
