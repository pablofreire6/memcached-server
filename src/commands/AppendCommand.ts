import { IMessage } from '../interfaces/IMessage';
import { ICache } from '../interfaces/ICache';
import { StoreCommand } from './StoreCommand';
import { cleanText } from '../lib/utils';
import { IItem } from '../interfaces/IItem';

export class AppendCommand extends StoreCommand {
  constructor(line: string[], messageParser: IMessage, cache: ICache) {
    super(line, messageParser, cache);
  }

  /**
   * Can add data only if a given key already exists in cache
   *
   * @param key string
   * @param item IItem
   *
   * @return boolean
   */
  isValidItem(key: string, item: IItem): boolean {
    return this.cache.has(key);
  }

  /**
   * Update the existing data in cache with the new sent data
   * added to the end
   *
   * @param message string
   */
  updateMessage(message: string) {
    const [command, key] = this.line;
    const item = this.cache.get(cleanText(key));

    const newMessage = item.getMessage() + message;
    this.message = cleanText(newMessage);
    this.updateBytes(this.message.length.toString());
  }
}
