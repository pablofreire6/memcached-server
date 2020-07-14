import CommandFactory, { CommandType } from './CommandFactory';
import { GetCommand } from './GetCommand';
import { SetCommand } from './SetCommand';
import { AddCommand } from './AddCommand';
import { ReplaceCommand } from './ReplaceCommand';
import { PrependCommand } from './PrependCommand';
import { CasCommand } from './CasCommand';
import { AppendCommand } from './AppendCommand';

describe('Create an instance of the command class requested', () => {
  it('should return an instance of GetCommand class', () => {
    // Arrange
    const commandFactory = new CommandFactory();

    // Act
    const getCommand = commandFactory.create(CommandType.get, 'get apple\r\n');

    // Assert
    expect(getCommand instanceof GetCommand).toBeTruthy();
  });

  it('should return an instance of SetCommand class', () => {
    // Arrange
    const commandFactory = new CommandFactory();

    // Act
    const setCommand = commandFactory.create(CommandType.set, 'set apple 0 900 4\r\n');

    // Assert
    expect(setCommand instanceof SetCommand).toBeTruthy();
  });

  it('should return an instance of AddCommand class', () => {
    // Arrange
    const commandFactory = new CommandFactory();

    // Act
    const addCommand = commandFactory.create(CommandType.add, 'add apple 0 900 4\r\n');

    // Assert
    expect(addCommand instanceof AddCommand).toBeTruthy();
  });

  it('should return an instance of ReplaceCommand class', () => {
    // Arrange
    const commandFactory = new CommandFactory();

    // Act
    const replaceCommand = commandFactory.create(CommandType.replace, 'replace apple 0 900 4\r\n');

    // Assert
    expect(replaceCommand instanceof ReplaceCommand).toBeTruthy();
  });

  it('should return an instance of AppendCommand class', () => {
    // Arrange
    const commandFactory = new CommandFactory();

    // Act
    const appendCommand = commandFactory.create(CommandType.append, 'append apple 0 900 4\r\n');

    // Assert
    expect(appendCommand instanceof AppendCommand).toBeTruthy();
  });

  it('should return an instance of PrependCommand class', () => {
    // Arrange
    const commandFactory = new CommandFactory();

    // Act
    const prependCommand = commandFactory.create(CommandType.prepend, 'prepend apple 0 900 4\r\n');

    // Assert
    expect(prependCommand instanceof PrependCommand).toBeTruthy();
  });

  it('should return an instance of CasCommand class', () => {
    // Arrange
    const commandFactory = new CommandFactory();

    // Act
    const casCommand = commandFactory.create(CommandType.cas, 'cas apple 0 900 4\r\n');

    // Assert
    expect(casCommand instanceof CasCommand).toBeTruthy();
  });
});
