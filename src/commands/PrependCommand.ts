import { IMessage } from '../interfaces/IMessage';
import { ICache } from '../interfaces/ICache';
import { cleanText } from '../lib/utils';
import { AppendCommand } from './AppendCommand';

export class PrependCommand extends AppendCommand {
  constructor(line: string[], messageParser: IMessage, cache: ICache) {
    super(line, messageParser, cache);
  }

  isValidItem(key: string, item: object): boolean {
    return this.cache.has(key);
  }

  getMessageUpdated(message: string, item) {
    return cleanText(message) + item.getMessage();
  }
}
