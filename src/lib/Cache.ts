import { ICache } from '../interfaces/ICache';

export class Cache implements ICache {
  private static instance: Cache;
  private cache = new Map();

  private constructor() {}

  static getInstance() {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }

    return Cache.instance;
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  get(key: string) {
    return this.cache.get(key);
  }

  add(key, item) {
    this.cache.set(key, item);
  }

  remove(key) {
    this.cache.delete(key);
  }

  update(item, content) {}
}
