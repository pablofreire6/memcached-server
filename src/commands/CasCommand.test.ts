import { CasCommand } from './CasCommand';
import { Message } from '../lib/Message';
import { Item } from '../lib/Item';
import { Cache } from '../lib/Cache';

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

describe('Cas Command ', () => {
  it('should update the existing data found by cas unique', () => {
    // Arrange
    const data = 'cas apple 0 900 7 1\r\n'.split(' ');
    const casCommand = new CasCommand(data, new Message(), Cache.getInstance());
    casCommand.updateMessage('updated\r\n');

    // Act
    const result = casCommand.run();

    // Assert
    expect(result).toBe('STORED\r\n');
  });

  it('should throw an error if no item found with cas unique', () => {
    // Arrange
    const data = 'cas banana 0 900 7 1\r\n'.split(' ');
    const casCommand = new CasCommand(data, new Message(), Cache.getInstance());
    casCommand.updateMessage('updated\r\n');

    // Act
    // Assert
    expect(() => {
      casCommand.run();
    }).toThrowError('NOT_FOUND\r\n');
  });

  it('should throw an error if the item has been modified since last fetch', () => {
    // Arrange
    const data = 'cas apple 0 900 7 2\r\n'.split(' ');
    const casCommand = new CasCommand(data, new Message(), Cache.getInstance());
    casCommand.updateMessage('updated\r\n');

    // Act
    // Assert
    expect(() => {
      casCommand.run();
    }).toThrowError('EXISTS\r\n');
  });
});
