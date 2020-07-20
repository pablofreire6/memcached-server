import { IMessage } from '../interfaces/IMessage';
import { IItem } from '../interfaces/IItem';

export class Message implements IMessage {
  parseGet(data: IItem[], useCasId = false) {
    var result = '';

    data.forEach((item) => {
      result += `VALUE ${item.getKey()} ${item.getFlags()} ${item.getBytes()}`;

      if (useCasId) {
        result += ` ${item.getCasId()}`;
      }
      result += `\r\n${item.getMessage()}\r\n`;
    });

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
