"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandFactory_1 = __importStar(require("../commands/CommandFactory"));
class Connection {
    constructor(socket) {
        this.commandInstance = null;
        this.socket = socket;
        const { address } = socket.address();
        this.socket.write(`Connected to ${address} \r\n`);
        this.socket.on('data', this.onData.bind(this));
        this.socket.on('close', this.onClose.bind(this));
        this.socket.on('error', this.onError.bind(this));
        this.socket.on('end', this.onEnd);
    }
    /**
     * Receive the client data ask to process command
     * send the response back to client
     *
     * @param data Buffer | string
     */
    onData(data) {
        let result;
        try {
            result = this.handleCommand(data);
        }
        catch (err) {
            this.commandInstance = null;
            result = err.message;
        }
        if (result === 'continue') {
            return;
        }
        this.socket.write(result);
    }
    onClose() {
        this.socket.write('connection closed');
    }
    onError(err) {
        this.socket.write(err.message);
    }
    onEnd() {
        console.log('Client disconnected from server');
    }
    /**
     * Read and execute the command
     * send back the results
     *
     * @param data
     */
    handleCommand(data) {
        const line = Buffer.from(data).toString();
        const options = line.split(' ');
        if (!this.commandInstance) {
            const [cmd] = options;
            const command = CommandFactory_1.CommandType[cmd];
            const commandFactory = new CommandFactory_1.default();
            this.commandInstance = commandFactory.create(command, options);
        }
        else {
            this.commandInstance.updateMessage(line);
        }
        const result = this.commandInstance.run();
        if (result !== 'continue') {
            this.commandInstance = null;
        }
        return result;
    }
}
exports.default = Connection;
