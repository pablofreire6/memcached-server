"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeMessage = exports.cleanText = void 0;
function cleanText(text) {
    return text.replace(/[\r\n]/g, '');
}
exports.cleanText = cleanText;
function encodeMessage(message) {
    let buff = Buffer.from(message);
    return buff.toString('base64');
}
exports.encodeMessage = encodeMessage;
