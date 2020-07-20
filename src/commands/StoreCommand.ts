import { IMessage } from '../interfaces/IMessage';
import { ICommand } from '../interfaces/ICommand';
import { ICache } from '../interfaces/ICache';
import { NOTSTORED, CLIENTERROR, ERROR, CLIENTERRORBADFORMAT, CONTINUE } from '../lib/ErrorMessage';
import { cleanText, uniqueId } from '../lib/utils';
import { Item } from '../lib/Item';

import { Logger } from '../lib/Logger';

export abstract class StoreCommand implements ICommand {
  protected messageParser: IMessage;
  protected line: string[];
  protected message: string = '';
  protected cache: ICache;
  protected LINE_PARAMS_COUNT = 5;

  constructor(line: string[], messageParser: IMessage, cache: ICache) {
    this.line = line;
    this.messageParser = messageParser;
    this.cache = cache;
  }

  /**
   * It will process the command, validate and wait for the data to store in cache
   *
   * @return string
   */
  run(): string {
    Logger.log('MESSAGE', this.message);

    let item = this.createItem();

    const [command, key] = this.line;
    if (!this.isValidItem(key, item)) {
      throw new Error(NOTSTORED);
    }

    this.doSave(key, item);

    return this.messageParser.parseSet();
  }

  updateBytes(bytes) {
    this.line[4] = bytes;
  }

  /**
   * set the message that will be stored in cache
   *
   * @param message string
   */
  updateMessage(message: string): void {
    this.message = cleanText(message);
  }

  /**
   * Save the item with the given key in the cache
   *
   * @param key string
   * @param item IItem
   */
  doSave(key: string, item: Item) {
    this.cache.add(key, item);
  }

  /**
   * It will add the validations needed it should be overriden
   * by concrete implementations
   *
   * @param key string
   * @param item IItem
   *
   * @return boolean
   */
  isValidItem(key: string, item: object): boolean {
    return true;
  }

  protected validateLine() {
    if (this.line.length !== this.LINE_PARAMS_COUNT) {
      throw new Error(ERROR);
    }

    const [command, key, flags, exptime, bytes] = this.line;

    const validateParams = () => {
      return isNaN(parseInt(flags, 10)) || isNaN(parseInt(cleanText(bytes), 10)) || isNaN(parseInt(exptime, 10));
    };

    if (validateParams()) {
      throw new Error(CLIENTERRORBADFORMAT);
    }

    if (!this.message.length) {
      throw new Error(CONTINUE);
    }

    if (parseInt(cleanText(bytes), 10) !== this.message.length) {
      throw new Error(CLIENTERROR);
    }
  }

  protected createItem(): Item {
    const [command, key, flags, exptime, bytes] = this.line;

    this.validateLine();

    let item: Item = new Item();
    item.setKey(key);
    item.setFlags(parseInt(flags, 10));
    item.setExpirationTime(parseInt(exptime, 10));
    item.setBytes(parseInt(cleanText(bytes), 10));
    item.setMessage(this.message);
    item.setCasId(uniqueId());

    return item;
  }
}
