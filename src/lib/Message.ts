import { IMessage } from '../interfaces/IMessage';

export class Message implements IMessage {
  parseGet(data: any) {
    var result = '';
    for (let i = 0; i < data.length; i++) {
      result += `VALUE ${data[i].flags} ${data[i].bytes} [<cas unique>]\r\n${data[i].data}\r\n`;
    }

    result += this.closeMessage();
    return result;
  }

  parseSet(data: any) {
    return `STORED\r\n`;
  }

  private closeMessage() {
    return 'END\r\n';
  }
}
