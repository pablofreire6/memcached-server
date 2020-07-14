import { AddCommand } from './AddCommand';
import { Message } from '../lib/Message';
import { Item } from '../lib/Item';
import { Cache } from '../lib/Cache';

beforeAll(() => {
  let item1 = new Item();
  item1.setKey('apple').setFlags(0).setExpirationTime(60).setBytes(5).setMessage('apple');

  Cache.getInstance().add('apple', item1);
});

describe('Add the data', () => {
  it('should add the data with a key that doesnt exists and return STORED', () => {
    // Arrange
    const data = 'add orange 0 900 6'.split(' ');
    const addCommand = new AddCommand(data, new Message(), Cache.getInstance());
    addCommand.updateMessage('orange\r\n');

    // Act
    const result = addCommand.run();

    // Assert
    expect(result).toBe('STORED\r\n');
  });

  it('should return an error when add data to a key that alrady exists', () => {
    // Arrange
    const data = 'add apple 0 900 7'.split(' ');
    const addCommand = new AddCommand(data, new Message(), Cache.getInstance());
    addCommand.updateMessage('updated\r\n');

    // Act
    expect(() => {
      addCommand.run();
    }).toThrowError('NOT_STORED\r\n');
  });

  it('should return a continue text when waiting for message', () => {});
});
