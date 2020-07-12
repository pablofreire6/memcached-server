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
    const [command, ...keys] = this.line.split(' ');
    const result = [];
    keys.forEach((key) => {
      if (this.cache.has(cleanText(key))) {
        result.push(this.cache.get(cleanText(key)));
      }
    });

    return this.messageParser.parseGet(result);
  }
}
