import events from 'events';
import Connection from './Connection';

describe('Connection actions handler', () => {
  let conn;
  let emitter;

  beforeEach(() => {
    emitter = new events.EventEmitter();
    conn = {
      on: (action, callback) => emitter.on(action, callback),
      write: jest.fn(),
      address: jest.fn().mockImplementation(() => ({
        address: '127.0.0',
      })),
    };
  });

  it('should listen on data received', () => {
    new Connection(conn);

    emitter.emit('data', 'get special item');

    expect(conn.write).toBeCalledTimes(2);
  });

  it('should listen on error received', () => {
    new Connection(conn);

    emitter.emit('error', { message: 'error message' });

    expect(conn.write).toBeCalledTimes(2);
  });

  it('should listen on close connection', () => {
    new Connection(conn);

    emitter.emit('close');

    expect(conn.write).toBeCalledTimes(2);
  });
});
