import { PrependCommand } from './PrependCommand';
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

describe('prepend Command', () => {
  it('should add content to the beginning of existing', () => {
    // Arrange
    const line = 'prepend apple 0 900 4\r\n'.split(' ');
    const prependCommand = new PrependCommand(line, new Message(), Cache.getInstance());
    prependCommand.updateMessage('added');

    // Act
    const result = prependCommand.run();

    // Assert
    expect(result).toBe('STORED\r\n');
    const item = Cache.getInstance().get('apple');
    expect(item.getMessage()).toBe('addedapple');
  });
});
