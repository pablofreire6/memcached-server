"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanText = void 0;
function cleanText(text) {
    return text.replace(/[\r\n]/g, '');
}
exports.cleanText = cleanText;
