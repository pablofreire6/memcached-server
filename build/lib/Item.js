"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor() { }
    setKey(key) {
        this.key = key;
    }
    setFlags(flags) {
        this.flags = flags;
    }
    setExpirationTime(exptime) {
        let newTime = exptime;
        if (newTime > 0) {
            newTime = new Date().getTime() + newTime * 1000;
        }
        this.expirationTime = newTime;
    }
    setBytes(bytes) {
        this.bytes = bytes;
    }
    setMessage(message) {
        this.message = message;
    }
    setCasId(casId) {
        this.casId = casId;
    }
    getKey() {
        return this.key;
    }
    getFlags() {
        return this.flags;
    }
    getExpirationTime() {
        return this.expirationTime;
    }
    getBytes() {
        return this.bytes;
    }
    getMessage() {
        return this.message;
    }
    getCasId() {
        return this.casId;
    }
}
exports.Item = Item;
