import { IMessage } from '../interfaces/IMessage';
import { ICache } from '../interfaces/ICache';
import { cleanText } from '../lib/utils';
import { AppendCommand } from './AppendCommand';

export class PrependCommand extends AppendCommand {
  constructor(line: string[], messageParser: IMessage, cache: ICache) {
    super(line, messageParser, cache);
  }

  /**
   * Add the new text to the end of existing text
   *
   * @param message string
   * @param item Item
   */
  getMessageUpdated(message: string, item) {
    return cleanText(message) + item.getMessage();
  }
}
