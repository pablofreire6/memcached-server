import { IMessage } from '../interfaces/IMessage';
import { ICache } from '../interfaces/ICache';
import { StoreCommand } from './StoreCommand';
import { uniqueId } from '../lib/utils';
import { NOTFOUND, EXISTS } from '../lib/ErrorMessage';

export class CasCommand extends StoreCommand {
  protected LINE_PARAMS_COUNT = 6;

  constructor(line: string[], messageParser: IMessage, cache: ICache) {
    super(line, messageParser, cache);
  }

  /**
   * Add validation for NOT_FOUND and EXISTS for Cas scenarios
   */
  validateLine() {
    super.validateLine();

    const [command, key, flags, exptime, bytes, casId] = this.line;

    let item = this.cache.get(key);

    if (!item) {
      throw new Error(NOTFOUND);
    }

    if (item && parseInt(casId, 10) !== item.getCasId()) {
      throw new Error(EXISTS);
    }
  }
}
