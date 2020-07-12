import { GetCommand } from './GetCommand';
import { Message } from '../lib/Message';
import { Cache } from '../lib/Cache';

beforeAll(() => {
  let item1 = { key: 'apple', flags: '0', exptime: '60', bytes: '5', data: 'apple' };
  let item2 = { key: 'banana', flags: '0', exptime: '60', bytes: '6', data: 'banana' };
  Cache.getInstance().add('apple', item1);
  Cache.getInstance().add('banana', item2);
});

describe('get text for a given key', () => {
  it('should return the text for a given key that exists in cache', () => {
    // Arrange
    const getCommand = new GetCommand('get apple\r\n', new Message(), Cache.getInstance());

    // Act
    const response = getCommand.run();

    // Assert
    expect(response).toBe('VALUE 0 5 [<cas unique>]\r\napple\r\nEND\r\n');
  });

  it('should return empty if the key doesnt exist in cache', () => {
    // Arrange
    const getCommand = new GetCommand('get orange\r\n', new Message(), Cache.getInstance());

    // Act
    const response = getCommand.run();

    // Assert
    expect(response).toBe('END\r\n');
  });

  it('should return text for two given keys that exists in cache', () => {
    // Arrange
    const getCommand = new GetCommand('get apple banana\r\n', new Message(), Cache.getInstance());

    // Act
    const response = getCommand.run();

    // Assert
    expect(response).toBe('VALUE 0 5 [<cas unique>]\r\napple\r\nVALUE 0 6 [<cas unique>]\r\nbanana\r\nEND\r\n');
  });
});
