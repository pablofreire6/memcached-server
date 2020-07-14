import { IMessage } from '../interfaces/IMessage';
import { ICache } from '../interfaces/ICache';
import { StoreCommand } from './StoreCommand';
import { cleanText } from '../lib/utils';

export class AppendCommand extends StoreCommand {
  constructor(line: string[], messageParser: IMessage, cache: ICache) {
    super(line, messageParser, cache);
  }

  isValid(key: string, item: object): boolean {
    return this.cache.has(key);
  }

  // implemen doSave()
  updateMessage(message) {
    const [command, key] = this.line;
    const item = this.cache.get(cleanText(key));

    const newMessage = item.getMessage() + message;
    this.message = cleanText(newMessage);
  }
}
