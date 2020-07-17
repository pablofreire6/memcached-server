"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    parseGet(data) {
        var result = '';
        for (let i = 0; i < data.length; i++) {
            // [<cas unique>]
            const item = data[i];
            const casId = item.getCasId() ? item.getCasId() : '';
            result += `VALUE ${item.getKey()} ${item.getFlags()} ${item.getBytes()} ${casId}\r\n${item.getMessage()}\r\n`;
        }
        result += this.closeMessage();
        return result;
    }
    parseSet(data = 'stored') {
        return `STORED\r\n`;
    }
    closeMessage() {
        return 'END\r\n';
    }
}
exports.Message = Message;
