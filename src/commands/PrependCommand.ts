import { IMessage } from '../interfaces/IMessage';
import { ICache } from '../interfaces/ICache';
import { StoreCommand } from './StoreCommand';
import { cleanText } from '../lib/utils';

export class PrependCommand extends StoreCommand {
  constructor(line: string[], messageParser: IMessage, cache: ICache) {
    super(line, messageParser, cache);
  }

  isValidItem(key: string, item: object): boolean {
    return this.cache.has(key);
  }

  /**
   * Update the existing data in cache with the new sent data
   * added to the beginning
   *
   * @param message string
   */
  updateMessage(message: string) {
    const [command, key] = this.line;
    const item = this.cache.get(cleanText(key));

    const newMessage = message + item.getMessage();
    this.message = cleanText(newMessage);
    this.updateBytes(this.message.length.toString());
  }
}
