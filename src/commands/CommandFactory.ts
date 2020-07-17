import { Cache } from '../lib/Cache';
import { Message } from '../lib/Message';
import { GetCommand } from './GetCommand';
import { SetCommand } from './SetCommand';
import { AddCommand } from './AddCommand';
import { CasCommand } from './CasCommand';
import { ICommand } from '../interfaces/ICommand';
import { ReplaceCommand } from './ReplaceCommand';
import { NONEXISTINGCOMMAND } from '../lib/ErrorMessage';
import { AppendCommand } from './AppendCommand';
import { PrependCommand } from './PrependCommand';
import { GetsCommand } from './GetsCommand';

export enum CommandType {
  get = 1,
  gets,
  set,
  add,
  replace,
  append,
  prepend,
  cas,
}

/**
 * Factory class to create the concrete command class instance
 */
export default class CommandFactory {
  /**
   * Create a concrete class instance for the given command
   *
   * @param type CommandType
   * @param line string[]
   *
   * @return Command class instance
   */
  create(type: CommandType, line: string[]) {
    let command: ICommand;

    switch (type) {
      case CommandType.get:
        command = new GetCommand(line, new Message(), Cache.getInstance());
        break;
      case CommandType.gets:
        command = new GetsCommand(line, new Message(), Cache.getInstance());
        break;
      case CommandType.set:
        command = new SetCommand(line, new Message(), Cache.getInstance());
        break;
      case CommandType.add:
        command = new AddCommand(line, new Message(), Cache.getInstance());
        break;
      case CommandType.replace:
        command = new ReplaceCommand(line, new Message(), Cache.getInstance());
        break;
      case CommandType.append:
        command = new AppendCommand(line, new Message(), Cache.getInstance());
        break;
      case CommandType.prepend:
        command = new PrependCommand(line, new Message(), Cache.getInstance());
        break;
      case CommandType.cas:
        command = new CasCommand(line, new Message(), Cache.getInstance());
        break;

      default:
        throw new Error(NONEXISTINGCOMMAND);
    }

    return command;
  }
}
