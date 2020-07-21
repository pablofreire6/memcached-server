import CommandFactory, { CommandType } from './CommandFactory';
import { GetCommand } from './GetCommand';
import { SetCommand } from './SetCommand';
import { AddCommand } from './AddCommand';
import { ReplaceCommand } from './ReplaceCommand';
import { PrependCommand } from './PrependCommand';
import { CasCommand } from './CasCommand';
import { AppendCommand } from './AppendCommand';
import { GetsCommand } from './GetsCommand';

function splitContent(text) {
  return text.split(' ');
}

describe('Create an instance of the command class requested', () => {
  it('should return an instance of GetCommand class', () => {
    // Arrange
    const commandFactory = new CommandFactory();

    // Act
    const data = splitContent('get apple\r\n');
    const getCommand = commandFactory.create(CommandType.get, data);

    // Assert
    expect(getCommand instanceof GetCommand).toBeTruthy();
  });

  it('should return an instance of SetCommand class', () => {
    // Arrange
    const commandFactory = new CommandFactory();

    // Act
    const data = splitContent('set apple 0 900 4\r\n');
    const setCommand = commandFactory.create(CommandType.set, data);

    // Assert
    expect(setCommand instanceof SetCommand).toBeTruthy();
  });

  it('should return an instance of AddCommand class', () => {
    // Arrange
    const commandFactory = new CommandFactory();

    // Act
    const data = splitContent('add apple 0 900 4\r\n');
    const addCommand = commandFactory.create(CommandType.add, data);

    // Assert
    expect(addCommand instanceof AddCommand).toBeTruthy();
  });

  it('should return an instance of ReplaceCommand class', () => {
    // Arrange
    const commandFactory = new CommandFactory();

    // Act
    const data = splitContent('replace apple 0 900 4\r\n');
    const replaceCommand = commandFactory.create(CommandType.replace, data);

    // Assert
    expect(replaceCommand instanceof ReplaceCommand).toBeTruthy();
  });

  it('should return an instance of AppendCommand class', () => {
    // Arrange
    const commandFactory = new CommandFactory();

    // Act
    const data = splitContent('append apple 0 900 4\r\n');
    const appendCommand = commandFactory.create(CommandType.append, data);

    // Assert
    expect(appendCommand instanceof AppendCommand).toBeTruthy();
  });

  it('should return an instance of PrependCommand class', () => {
    // Arrange
    const commandFactory = new CommandFactory();

    // Act
    const data = splitContent('prepend apple 0 900 4\r\n');
    const prependCommand = commandFactory.create(CommandType.prepend, data);

    // Assert
    expect(prependCommand instanceof PrependCommand).toBeTruthy();
  });

  it('should return an instance of CasCommand class', () => {
    // Arrange
    const commandFactory = new CommandFactory();

    // Act
    const data = splitContent('cas apple 0 900 4\r\n');
    const casCommand = commandFactory.create(CommandType.cas, data);

    // Assert
    expect(casCommand instanceof CasCommand).toBeTruthy();
  });

  it('should return an instance of GetsCommand class', () => {
    // Arrange
    const commandFactory = new CommandFactory();

    // Act
    const data = splitContent('cas apple 0 900 4\r\n');
    const getsCommand = commandFactory.create(CommandType.gets, data);

    // Assert
    expect(getsCommand instanceof GetsCommand).toBeTruthy();
  });
});
