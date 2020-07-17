import { GetCommand } from './GetCommand';
import { encodeMessage } from '../lib/utils';
import { Item } from '../lib/Item';

export class GetsCommand extends GetCommand {
  /**
   * Given a list of keys it will return all the items
   * found for them including the cas unique id
   *
   * @param keys string[]
   */
  findByKeys(keys: string[]) {
    let result = super.findByKeys(keys);

    let updateResult = result.map((item) => {
      // cloning the original instance to prevent mutation
      let newItem = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
      newItem.setCasId(encodeMessage(item.getMessage()));
      return newItem;
    });

    return updateResult;
  }
}
