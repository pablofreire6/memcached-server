import { IMessage } from '../interfaces/IMessage';
import { ICache } from '../interfaces/ICache';
import { StoreCommand } from './StoreCommand';

export class SetCommand extends StoreCommand {
  constructor(line: string[], messageParser: IMessage, cache: ICache) {
    super(line, messageParser, cache);
  }
}
