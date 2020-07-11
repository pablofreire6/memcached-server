import { ICommand } from '../interfaces/ICommand';
import { IMessage } from '../interfaces/IMessage';
import { ICache } from '../interfaces/ICache';
import { cleanText } from '../lib/utils';
import { StoreCommand } from './StoreCommand';

export class SetCommand extends StoreCommand implements ICommand {
  constructor(line: string, messageParser: IMessage, cache: ICache) {
    super(line, messageParser, cache);
  }

  doSave(key: string, item: object): void {
    this.cache.add(key, item);
  }
}

//responses:
// "STORED\r\n"
// "NOT_STORED\r\n"
// "EXISTS\r\n"
// "NOT_FOUND\r\n"
