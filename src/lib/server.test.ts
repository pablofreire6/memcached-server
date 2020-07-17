import net, { AddressInfo } from 'net';
import Server from './Server';
import { PORT } from '../config/config';

let server;

afterEach(() => {
  if (server) {
    server.stop();
  }
});

describe('connection to tcp server', () => {
  it('should connect to the server', async () => {
    server = new Server();

    const result = await server.start();

    expect(result).toContain('listen to');
  });

  it('should accept a connection to the server', () => {});

  it('should close a connection created', () => {
    //connect to server
    //close the connection
  });
});
