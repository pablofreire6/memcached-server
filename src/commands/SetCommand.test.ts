import { SetCommand } from './SetCommand';
import { Message } from '../lib/Message';
import { Cache } from '../lib/Cache';

describe('Store the data', () => {
  it('should store the data given and return STORED', () => {
    // Arrange
    const data = 'set apple 0 900 5'.split(' ');
    const setCommand = new SetCommand(data, new Message(), Cache.getInstance());
    setCommand.updateMessage('apple\r\n');

    // Act
    const result = setCommand.run();

    // Assert
    expect(result).toBe('STORED\r\n');
  });

  it('should return an error when not valid data is sent', () => {
    // Arrange
    const data = 'set orange 0 900 3'.split(' ');
    const setCommand = new SetCommand(data, new Message(), Cache.getInstance());
    setCommand.updateMessage('orange\r\n');

    // Act
    expect(() => {
      setCommand.run();
    }).toThrowError('CLIENT_ERROR bad data\r\nERROR\r\n');
  });

  it('should return a continue text when waiting for message', () => {
    // Arrange
    const data = 'set apple 0 900 5'.split(' ');
    const setCommand = new SetCommand(data, new Message(), Cache.getInstance());

    // Act
    const result = setCommand.run();

    // Assert
    expect(result).toBe('continue');

    // Act
    setCommand.updateMessage('apple\r\n');

    // Act
    const newResult = setCommand.run();

    // Assert
    expect(newResult).toBe('STORED\r\n');
  });
});
