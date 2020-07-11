import net from 'net';
import CommandFactory, { CommandType } from '../commands/CommandFactory';

export default class Connection {
  private socket: net.Socket;
  private commandInstance: any = null;

  constructor(socket: net.Socket) {
    this.socket = socket;

    this.socket.on('data', this.onData.bind(this));
    this.socket.on('close', this.onClose.bind(this));
    this.socket.on('error', this.onError.bind(this));
    this.socket.on('end', this.onEnd);
  }

  /**
   * Receive the client data ask to process command
   * send the response back to client
   *
   * @param data Buffer | string
   */
  onData(data: Buffer | string): void {
    let result: string;

    try {
      result = this.handleCommand(data);
    } catch (err) {
      result = err.message;
    }

    if (result === 'continue') {
      return;
    }

    this.socket.write(result);
  }

  onClose() {
    this.socket.write('connection closed');
  }

  onError(err: Error) {
    this.socket.write(err.message);
  }

  onEnd() {
    console.log('Client disconnected from server');
  }

  /**
   * Read and execute the command
   * send back the results
   *
   * @param data
   */
  private handleCommand(data: Buffer | string): string {
    const line = Buffer.from(data).toString();
    const options = line.split(' ');

    console.log('------options--------');
    console.log(options);
    console.log('---------------------');

    if (!this.commandInstance) {
      const [cmd] = options;
      const command: CommandType | undefined = (<any>CommandType)[cmd];

      const commandFactory = new CommandFactory();
      this.commandInstance = commandFactory.create(command, line);
    } else {
      this.commandInstance.updateMessage(line);
    }

    const result = this.commandInstance.run();

    if (result !== 'continue') {
      this.commandInstance = null;
    }

    return result;
  }
}
