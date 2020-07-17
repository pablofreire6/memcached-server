import { ICommand } from '../interfaces/ICommand';
import { IMessage } from '../interfaces/IMessage';
import { ICache } from '../interfaces/ICache';
import { cleanText, encodeMessage } from '../lib/utils';

export class GetCommand implements ICommand {
  private messageParser: IMessage;
  private line: string[];
  private cache: ICache;

  constructor(line: string[], messageParser: IMessage, cache: ICache) {
    this.line = line;
    this.messageParser = messageParser;
    this.cache = cache;
  }

  /**
   * Read the keys and search for stored data for each one
   *
   * @return string
   */
  run() {
    const [command, ...keys] = this.line;
    const result = this.findByKeys(keys);

    return this.messageParser.parseGet(result);
  }

  /**
   * Given a list of keys it will return all the items found for them
   *
   * @param keys string[]
   */
  protected findByKeys(keys: string[]) {
    const result = [];
    keys.forEach((key) => {
      const keyText = cleanText(key);
      if (this.cache.has(keyText)) {
        const item = this.cache.get(keyText);
        if (item) {
          // console.log('item', JSON.stringify(item));
          result.push(item);
        }
      }
    });

    return result;
  }
}
