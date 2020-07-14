import { ICache } from '../interfaces/ICache';
import { IItem } from '../interfaces/IItem';

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
    const item = this.cache.get(key);
    const currentTime = new Date().getTime();

    if (item.getExpirationTime() < currentTime) {
      return null;
    }

    return item;
  }

  add(key: string, item: IItem) {
    this.cache.set(key, item);
  }

  remove(key) {
    this.cache.delete(key);
  }

  update(key, item) {
    this.cache.set(key, item);
  }
}
