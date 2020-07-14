import { ICache } from '../interfaces/ICache';
import { IItem } from '../interfaces/IItem';

export class Cache implements ICache {
  private static instance: Cache;
  private cache = new Map<string, IItem>();

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

  get(key: string): IItem | null {
    const item: IItem = this.cache.get(key);
    const currentTime = new Date().getTime();
    const expirationTime = item.getExpirationTime();

    if (expirationTime !== 0 && expirationTime < currentTime) {
      return null;
    }

    return item;
  }

  add(key: string, item: IItem) {
    this.cache.set(key, item);
  }

  remove(key: string) {
    this.cache.delete(key);
  }

  update(key: string, item: IItem) {
    this.cache.set(key, item);
  }
}
