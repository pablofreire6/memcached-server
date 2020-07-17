import { IMessage } from '../interfaces/IMessage';
import { ICache } from '../interfaces/ICache';
import { StoreCommand } from './StoreCommand';

export class ReplaceCommand extends StoreCommand {
  constructor(line: string[], messageParser: IMessage, cache: ICache) {
    super(line, messageParser, cache);
  }

  /**
   * Will only store the data if item with the given key
   * already exists in cache
   *
   * @param key string
   * @param item IItem
   */
  isValidItem(key: string, item: object): boolean {
    return this.cache.has(key);
  }
}
