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

  it('should throw a continue error to keep waiting for missing message', () => {
    // Arrange
    const data = 'set apple 0 900 5'.split(' ');
    const setCommand = new SetCommand(data, new Message(), Cache.getInstance());

    // Assert
    expect(() => {
      setCommand.run();
    }).toThrowError('CONTINUE');

    // Act
    setCommand.updateMessage('apple\r\n');

    // Act
    const newResult = setCommand.run();

    // Assert
    expect(newResult).toBe('STORED\r\n');
  });

  it('should throw an error when set is call with less parameters', () => {
    // Arrange
    const data = 'set apple 0 900'.split(' ');
    const setCommand = new SetCommand(data, new Message(), Cache.getInstance());

    // Assert
    expect(() => {
      setCommand.run();
    }).toThrowError('ERROR\r\n');
  });

  it('should throw an error when set is called with bad formatted parameters', () => {
    // Arrange
    const data = 'set apple a 900 5'.split(' ');
    const setCommand = new SetCommand(data, new Message(), Cache.getInstance());

    // Assert
    expect(() => {
      setCommand.run();
    }).toThrowError('CLIENT_ERROR bad command line format\r\nERROR\r\n');
  });
});
