import { ReplaceCommand } from './ReplaceCommand';
import { Message } from '../lib/Message';
import { Item } from '../lib/Item';
import { Cache } from '../lib/Cache';

beforeAll(() => {
  let item1 = new Item();
  item1.setKey('apple');
  item1.setFlags(0);
  item1.setExpirationTime(60);
  item1.setBytes(5);
  item1.setMessage('apple');

  Cache.getInstance().add('apple', item1);
});

describe('Replace the data', () => {
  it('should replace the data with a key that exists and return STORED', () => {
    // Arrange
    const data = 'replace apple 0 900 7'.split(' ');
    const replaceCommand = new ReplaceCommand(data, new Message(), Cache.getInstance());
    replaceCommand.updateMessage('updated\r\n');

    // Act
    const result = replaceCommand.run();

    // Assert
    expect(result).toBe('STORED\r\n');
  });

  it('should return an error when replace data to a key that doesnt exists', () => {
    // Arrange
    const data = 'replace banana 0 900 7'.split(' ');
    const replaceCommand = new ReplaceCommand(data, new Message(), Cache.getInstance());
    replaceCommand.updateMessage('updated\r\n');

    // Act
    expect(() => {
      replaceCommand.run();
    }).toThrowError('NOT_STORED\r\n');
  });
});
