import { IMessage } from '../interfaces/IMessage';
import { ICache } from '../interfaces/ICache';
import { StoreCommand } from './StoreCommand';
import { IItem } from '../interfaces/IItem';

export class AddCommand extends StoreCommand {
  constructor(line: string[], messageParser: IMessage, cache: ICache) {
    super(line, messageParser, cache);
  }

  /**
   * Add Command will only store the data if the server doesn't hold
   * the data for the given key
   *
   * @param key string
   * @param item IItem
   */
  isValidItem(key: string, item: IItem): boolean {
    return !this.cache.has(key);
  }
}
