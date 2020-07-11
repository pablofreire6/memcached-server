import net from 'net';
import Server from './Server';

let server;

afterAll(() => {
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

  it('should accept a connection to the server', () => {
    // start a server
    // create a client
    // connect to the server
    // verify active connections
  });

  it('should close a connection created', () => {
    //connect to server
    //close the connection
  });
});

/*
const client = new net.Socket();

    // Act
    client.connect({
      port: process.env.PORT,
      host: "localhost",
    });
*/
