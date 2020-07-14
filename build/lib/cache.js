"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
class Cache {
    constructor() {
        this.cache = new Map();
    }
    static getInstance() {
        if (!Cache.instance) {
            Cache.instance = new Cache();
        }
        return Cache.instance;
    }
    has(key) {
        return this.cache.has(key);
    }
    get(key) {
        const item = this.cache.get(key);
        const currentTime = new Date().getTime();
        if (item.getExpirationTime() < currentTime) {
            return null;
        }
        return item;
    }
    add(key, item) {
        this.cache.set(key, item);
    }
    remove(key) {
        this.cache.delete(key);
    }
    update(key, item) {
        this.cache.set(key, item);
    }
}
exports.Cache = Cache;
