import { IMessage } from '../interfaces/IMessage';
import { ICache } from '../interfaces/ICache';
import { StoreCommand } from './StoreCommand';

export class PrependCommand extends StoreCommand {
  constructor(line: string[], messageParser: IMessage, cache: ICache) {
    super(line, messageParser, cache);
  }

  isValid(key: string, item: object): boolean {
    return this.cache.has(key);
  }

  // implement doSave
}
