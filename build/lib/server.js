"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const config_1 = require("../config/config");
const Connection_1 = __importDefault(require("./Connection"));
class Server {
    start() {
        return new Promise((resolve, reject) => {
            this.server = net_1.default.createServer({ allowHalfOpen: true });
            this.server.on('connection', (socket) => new Connection_1.default(socket));
            this.server.on('error', (err) => {
                reject(err.message);
            });
            this.server.listen(config_1.PORT, () => {
                const { address, port } = this.server.address();
                resolve(`listen to ${address} ${port}`);
            });
        });
    }
    stop() {
        if (this.server && this.server.listening) {
            this.server.close();
        }
    }
}
exports.default = Server;
