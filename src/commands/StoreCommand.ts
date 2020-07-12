import { IMessage } from '../interfaces/IMessage';
import { ICommand } from '../interfaces/ICommand';
import { ICache } from '../interfaces/ICache';
import { NOTSTORED } from '../lib/ErrorMessage';
import { cleanText } from '../lib/utils';

export abstract class StoreCommand implements ICommand {
  protected messageParser: IMessage;
  protected line: string;
  protected bytesRemaining: number = 0;
  protected message: string = '';
  protected cache: ICache;

  constructor(line: string, messageParser: IMessage, cache: ICache) {
    this.line = line;
    this.messageParser = messageParser;
    this.cache = cache;
  }

  run() {
    console.log('------message------');
    console.log(this.message);
    console.log('-------------------');
    for (let i = 0; i < this.message.length; i++) {
      this.bytesRemaining--;
    }

    const [command, key, flags, exptime, bytes] = this.line.split(' ');
    let item = { key, flags, exptime, bytes: cleanText(bytes), data: this.message };

    if (item.bytes && !this.message.length) {
      this.bytesRemaining = parseInt(item.bytes, 10);
    }

    console.log('-------REMAINING---------');
    console.log(this.bytesRemaining);
    console.log('-------------------------');

    if (this.bytesRemaining) {
      return 'continue';
    }

    if (!this.isValid(key, item)) {
      throw new Error(NOTSTORED);
    }

    this.doSave(key, item);

    return this.messageParser.parseSet(['set command']);
  }

  updateMessage(message: string): void {
    this.message = cleanText(message);
  }

  doSave(key: string, item: object) {
    this.cache.add(key, item);
  }

  isValid(key: string, item: object): boolean {
    return true;
  }
}
