import { ReplaceCommand } from './ReplaceCommand';
import { Message } from '../lib/Message';
import { Item } from '../lib/Item';
import { Cache } from '../lib/Cache';

beforeAll(() => {
  let item1 = new Item();
  item1.setKey('apple').setFlags(0).setExpirationTime(60).setBytes(5).setMessage('apple');

  Cache.getInstance().add('apple', item1);
});

describe('Replace the data', () => {
  it('should replace the data with a key that exists and return STORED', () => {
    // Arrange
    const data = 'replace apple 0 900 7'.split(' ');
    const addCommand = new ReplaceCommand(data, new Message(), Cache.getInstance());
    addCommand.updateMessage('updated\r\n');

    // Act
    const result = addCommand.run();

    // Assert
    expect(result).toBe('STORED\r\n');
  });

  it('should return an error when add data to a key that alrady exists', () => {});

  it('should return a continue text when waiting for message', () => {});
});
