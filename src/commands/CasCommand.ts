import { IMessage } from '../interfaces/IMessage';
import { ICache } from '../interfaces/ICache';
import { StoreCommand } from './StoreCommand';
import { uniqueId, cleanText } from '../lib/utils';

export class CasCommand extends StoreCommand {
  protected LINE_PARAMS_COUNT = 6;

  constructor(line: string[], messageParser: IMessage, cache: ICache) {
    super(line, messageParser, cache);
  }

  encodeCas() {
    return uniqueId();
  }

  validateLine() {
    super.validateLine();

    const [command, key, flags, exptime, bytes, casId] = this.line;

    let item = this.cache.get(key);

    if (!item) {
      throw new Error('NOT_FOUND\r\n');
    }

    if (item && parseInt(casId, 10) !== item.getCasId()) {
      throw new Error('EXISTS\r\n');
    }
  }
}
