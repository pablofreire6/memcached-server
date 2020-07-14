"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor() { }
    setKey(key) {
        this.key = key;
        return this;
    }
    setFlags(flags) {
        this.flags = flags;
        return this;
    }
    setExpirationTime(exptime) {
        var time = new Date().getTime() + exptime * 1000;
        this.expirationTime = time;
        return this;
    }
    setBytes(bytes) {
        this.bytes = bytes;
        return this;
    }
    setMessage(message) {
        this.message = message;
        return this;
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
}
exports.Item = Item;
