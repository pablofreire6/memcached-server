import { GetsCommand } from './GetsCommand';
import { Message } from '../lib/Message';
import { Cache } from '../lib/Cache';
import { Item } from '../lib/Item';

beforeAll(() => {
  let item1 = new Item();
  item1.setKey('apple');
  item1.setFlags(0);
  item1.setExpirationTime(60);
  item1.setBytes(5);
  item1.setCasId(1);
  item1.setMessage('apple');

  Cache.getInstance().add('apple', item1);
});

describe('gets command', () => {
  it('should return the existing item for the given key with the cas Id', () => {
    // Arrange
    const line = 'gets apple\r\n'.split(' ');
    const getsCommand = new GetsCommand(line, new Message(), Cache.getInstance());

    // Act
    const result = getsCommand.run();

    // Assert
    expect(result).toBe('VALUE apple 0 5 1\r\napple\r\nEND\r\n');
  });

  it('should return END when the item we are trying to get doesnt exists', () => {
    // Arrange
    const line = 'gets banana\r\n'.split(' ');
    const getsCommand = new GetsCommand(line, new Message(), Cache.getInstance());

    // Act
    const result = getsCommand.run();

    // Assert
    expect(result).toBe('END\r\n');
  });
});
