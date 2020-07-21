import { GetCommand } from './GetCommand';
import { Item } from '../lib/Item';
import { Cache } from '../lib/Cache';

export class GetsCommand extends GetCommand {
  /**
   * Get parsed result for "gets" command that will be sent to client
   *
   * @param result string[]
   *
   * @return string
   */
  parseMessage(result): string {
    return this.messageParser.parseGet(result, true);
  }
}
