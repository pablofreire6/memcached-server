"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueId = exports.cleanText = void 0;
function cleanText(text) {
    return text.replace(/[\r\n]/g, '');
}
exports.cleanText = cleanText;
function uniqueId() {
    var i = new Date().getTime();
    i = i & 0xffffffff;
    return i;
}
exports.uniqueId = uniqueId;
