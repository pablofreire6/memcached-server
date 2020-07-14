import { IMessage } from '../interfaces/IMessage';
import { ICache } from '../interfaces/ICache';
import { StoreCommand } from './StoreCommand';

export class CasCommand extends StoreCommand {
  constructor(line: string[], messageParser: IMessage, cache: ICache) {
    super(line, messageParser, cache);
  }

  encodeCas() {
    let buff = new Buffer(this.message);
    return buff.toString('base64');
  }
}
