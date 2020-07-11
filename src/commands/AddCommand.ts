import { ICommand } from '../interfaces/ICommand';
import { IMessage } from '../interfaces/IMessage';
import { NOTSTORED } from '../lib/ErrorMessage';
import { ICache } from '../interfaces/ICache';
import { StoreCommand } from './StoreCommand';

export class AddCommand extends StoreCommand implements ICommand {
  constructor(line: string, messageParser: IMessage, cache: ICache) {
    super(line, messageParser, cache);
  }

  doSave(key: string, item: object): void {
    if (this.cache.has(key)) {
      throw new Error(NOTSTORED);
    }

    this.cache.add(key, item);
  }
}
