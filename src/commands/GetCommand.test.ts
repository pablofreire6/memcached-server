import { GetCommand } from './GetCommand';
import { Message } from '../lib/Message';
import { Cache } from '../lib/Cache';
import { Item } from '../lib/Item';

beforeAll(() => {
  let item1 = new Item();
  item1.setKey('apple').setFlags(0).setExpirationTime(60).setBytes(5).setMessage('apple');
  let item2 = new Item();
  item2.setKey('banana').setFlags(0).setExpirationTime(60).setBytes(6).setMessage('banana');
  Cache.getInstance().add('apple', item1);
  Cache.getInstance().add('banana', item2);
});

describe('get text for a given key', () => {
  it('should return the text for a given key that exists in cache', () => {
    // Arrange
    const data = 'get apple\r\n'.split(' ');
    const getCommand = new GetCommand(data, new Message(), Cache.getInstance());

    // Act
    const response = getCommand.run();

    // Assert
    expect(response).toBe('VALUE apple 0 5\r\napple\r\nEND\r\n');
  });

  it('should return empty if the key doesnt exist in cache', () => {
    // Arrange
    const data = 'get orange\r\n'.split(' ');
    const getCommand = new GetCommand(data, new Message(), Cache.getInstance());

    // Act
    const response = getCommand.run();

    // Assert
    expect(response).toBe('END\r\n');
  });

  it('should return text for two given keys that exists in cache', () => {
    // Arrange
    const data = 'get apple banana\r\n'.split(' ');
    const getCommand = new GetCommand(data, new Message(), Cache.getInstance());

    // Act
    const response = getCommand.run();

    // Assert
    expect(response).toBe('VALUE apple 0 5\r\napple\r\nVALUE banana 0 6\r\nbanana\r\nEND\r\n');
  });
});
