import { IMessage } from '../interfaces/IMessage';
import { ICommand } from '../interfaces/ICommand';
import { ICache } from '../interfaces/ICache';
import { NOTSTORED, CLIENTERROR, ERROR } from '../lib/ErrorMessage';
import { cleanText } from '../lib/utils';
import { Item } from '../lib/Item';

import { Logger } from '../lib/Logger';

export abstract class StoreCommand implements ICommand {
  protected messageParser: IMessage;
  protected line: string[];
  protected message: string = '';
  protected cache: ICache;

  constructor(line: string[], messageParser: IMessage, cache: ICache) {
    this.line = line;
    this.messageParser = messageParser;
    this.cache = cache;
  }

  run() {
    Logger.log('MESSAGE', this.message);

    if (this.line.length !== 5) {
      throw new Error(ERROR);
    }

    const [command, key, flags, exptime, bytes] = this.line;

    if (!this.message.length) {
      return 'continue';
    } else if (parseInt(cleanText(bytes), 10) !== this.message.length) {
      throw new Error(CLIENTERROR);
    }

    let item = new Item();
    item
      .setKey(key)
      .setFlags(parseInt(flags, 10))
      .setExpirationTime(parseInt(exptime, 10))
      .setBytes(parseInt(cleanText(bytes), 10))
      .setMessage(this.message);

    if (!this.isValid(key, item)) {
      throw new Error(NOTSTORED);
    }

    this.doSave(key, item);
    this.message = '';

    return this.messageParser.parseSet();
  }

  updateMessage(message: string): void {
    this.message = cleanText(message);
  }

  doSave(key: string, item: Item) {
    this.cache.add(key, item);
  }

  isValid(key: string, item: object): boolean {
    return true;
  }
}
