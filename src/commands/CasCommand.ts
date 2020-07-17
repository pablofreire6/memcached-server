import { IMessage } from '../interfaces/IMessage';
import { ICache } from '../interfaces/ICache';
import { StoreCommand } from './StoreCommand';
import { encodeMessage, cleanText } from '../lib/utils';

export class CasCommand extends StoreCommand {
  protected LINE_PARAMS_COUNT = 6;

  constructor(line: string[], messageParser: IMessage, cache: ICache) {
    super(line, messageParser, cache);
  }

  encodeCas() {
    return encodeMessage(this.message);
  }

  validateLine() {
    super.validateLine();

    const [command, key, flags, exptime, bytes, casId] = this.line;

    let item = this.cache.get(key);

    if (item && cleanText(casId) !== encodeMessage(item.getMessage())) {
      throw new Error('EXISTS\r\n');
    }
  }
}
