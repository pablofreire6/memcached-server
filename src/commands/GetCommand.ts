import { ICommand } from '../interfaces/ICommand';
import { IMessage } from '../interfaces/IMessage';
import { ICache } from '../interfaces/ICache';
import { cleanText } from '../lib/utils';

export class GetCommand implements ICommand {
  private messageParser: IMessage;
  private line: string;
  private cache: ICache;

  constructor(line: string, messageParser: IMessage, cache: ICache) {
    this.line = line;
    this.messageParser = messageParser;
    this.cache = cache;
  }

  run() {
    const [command, key] = this.line.split(' ');
    // const [command, ...keys] = this.line.split(' ');
    // response = keys.forEach((key) => this.cache.get(cleanText(key)))

    const keyToSearch = cleanText(key);

    if (!this.cache.has(keyToSearch)) {
      return '';
    }

    const response = this.cache.get(keyToSearch);

    return this.messageParser.parseGet(response);
  }
}
