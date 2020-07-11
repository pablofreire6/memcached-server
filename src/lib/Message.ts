import { IMessage } from '../interfaces/IMessage';

export class Message implements IMessage {
  parseGet(data: any) {
    return `VALUE get ${data.flags} ${data.bytes} [<cas unique>]\r\n${data.data}\r\nEND\r\n`;
  }

  parseSet(data: any) {
    return `STORED\r\nEND\r\n`;
  }
}
