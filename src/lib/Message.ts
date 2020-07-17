import { IMessage } from '../interfaces/IMessage';
import { IItem } from '../interfaces/IItem';

export class Message implements IMessage {
  parseGet(data: IItem[]) {
    var result = '';
    for (let i = 0; i < data.length; i++) {
      // [<cas unique>]
      const item = data[i];
      const casId = item.getCasId() ? item.getCasId() : '';
      result += `VALUE ${item.getKey()} ${item.getFlags()} ${item.getBytes()} ${casId}\r\n${item.getMessage()}\r\n`;
    }

    result += this.closeMessage();
    return result;
  }

  parseSet(data: any = 'stored') {
    return `STORED\r\n`;
  }

  private closeMessage() {
    return 'END\r\n';
  }
}
