"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    parseGet(data, useCasId = false) {
        var result = '';
        data.forEach((item) => {
            result += `VALUE ${item.getKey()} ${item.getFlags()} ${item.getBytes()}`;
            if (useCasId) {
                result += ` ${item.getCasId()}`;
            }
            result += `\r\n${item.getMessage()}\r\n`;
        });
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
