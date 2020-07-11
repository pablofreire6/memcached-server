import net from 'net';
import { PORT } from '../config/config';
import Connection from './Connection';

export default class Server {
  private server: net.Server;

  start(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.server = net.createServer({ allowHalfOpen: true });
      this.server.on('connection', (socket) => new Connection(socket));

      this.server.on('error', (err) => {
        reject(err.message);
      });

      this.server.listen(PORT, () => {
        const { address, port } = this.server.address() as net.AddressInfo;
        resolve(`listen to ${address} ${port}`);
      });
    });
  }

  stop(): void {
    if (this.server && this.server.listening) {
      this.server.close();
    }
  }
}
