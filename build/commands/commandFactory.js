"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandType = void 0;
const Cache_1 = require("../lib/Cache");
const Message_1 = require("../lib/Message");
const GetCommand_1 = require("./GetCommand");
const SetCommand_1 = require("./SetCommand");
const AddCommand_1 = require("./AddCommand");
const CasCommand_1 = require("./CasCommand");
const ReplaceCommand_1 = require("./ReplaceCommand");
const ErrorMessage_1 = require("../lib/ErrorMessage");
const AppendCommand_1 = require("./AppendCommand");
const PrependCommand_1 = require("./PrependCommand");
const GetsCommand_1 = require("./GetsCommand");
var CommandType;
(function (CommandType) {
    CommandType[CommandType["get"] = 1] = "get";
    CommandType[CommandType["gets"] = 2] = "gets";
    CommandType[CommandType["set"] = 3] = "set";
    CommandType[CommandType["add"] = 4] = "add";
    CommandType[CommandType["replace"] = 5] = "replace";
    CommandType[CommandType["append"] = 6] = "append";
    CommandType[CommandType["prepend"] = 7] = "prepend";
    CommandType[CommandType["cas"] = 8] = "cas";
})(CommandType = exports.CommandType || (exports.CommandType = {}));
/**
 * Factory class to create the concrete command class instance
 */
class CommandFactory {
    /**
     * Create a concrete class instance for the given command
     *
     * @param type CommandType
     * @param line string[]
     *
     * @return Command class instance
     */
    create(type, line) {
        let command;
        switch (type) {
            case CommandType.get:
                command = new GetCommand_1.GetCommand(line, new Message_1.Message(), Cache_1.Cache.getInstance());
                break;
            case CommandType.gets:
                command = new GetsCommand_1.GetsCommand(line, new Message_1.Message(), Cache_1.Cache.getInstance());
                break;
            case CommandType.set:
                command = new SetCommand_1.SetCommand(line, new Message_1.Message(), Cache_1.Cache.getInstance());
                break;
            case CommandType.add:
                command = new AddCommand_1.AddCommand(line, new Message_1.Message(), Cache_1.Cache.getInstance());
                break;
            case CommandType.replace:
                command = new ReplaceCommand_1.ReplaceCommand(line, new Message_1.Message(), Cache_1.Cache.getInstance());
                break;
            case CommandType.append:
                command = new AppendCommand_1.AppendCommand(line, new Message_1.Message(), Cache_1.Cache.getInstance());
                break;
            case CommandType.prepend:
                command = new PrependCommand_1.PrependCommand(line, new Message_1.Message(), Cache_1.Cache.getInstance());
                break;
            case CommandType.cas:
                command = new CasCommand_1.CasCommand(line, new Message_1.Message(), Cache_1.Cache.getInstance());
                break;
            default:
                throw new Error(ErrorMessage_1.NONEXISTINGCOMMAND);
        }
        return command;
    }
}
exports.default = CommandFactory;
