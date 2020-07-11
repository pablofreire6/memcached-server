import { Cache } from '../lib/Cache';
import { Message } from '../lib/Message';
import { GetCommand } from './GetCommand';
import { SetCommand } from './SetCommand';
import { AddCommand } from './AddCommand';
import { ICommand } from '../interfaces/ICommand';
import { NONEXISTINGCOMMAND } from '../lib/ErrorMessage';

export enum CommandType {
  get = 1,
  set,
  add,
}

/**
 * Factory class to create the concrete command instance
 */
export default class CommandFactory {
  create(type: CommandType, line: string) {
    let command: ICommand;

    switch (type) {
      case CommandType.get:
        command = new GetCommand(line, new Message(), Cache.getInstance());
        break;
      case CommandType.set:
        command = new SetCommand(line, new Message(), Cache.getInstance());
        break;
      case CommandType.add:
        command = new AddCommand(line, new Message(), Cache.getInstance());
        break;

      default:
        throw new Error(NONEXISTINGCOMMAND);
    }

    return command;
  }
}
