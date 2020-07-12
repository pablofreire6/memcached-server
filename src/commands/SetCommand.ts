import { IMessage } from '../interfaces/IMessage';
import { ICache } from '../interfaces/ICache';
import { StoreCommand } from './StoreCommand';

export class SetCommand extends StoreCommand {
  constructor(line: string, messageParser: IMessage, cache: ICache) {
    super(line, messageParser, cache);
  }
}

//responses:
// "STORED\r\n"
// "NOT_STORED\r\n"
// "EXISTS\r\n"
// "NOT_FOUND\r\n"
