import { IItem } from '../interfaces/IItem';

export class Item implements IItem {
  private key: string;
  private flags: number;
  private expirationTime: number;
  private bytes: number;
  private message: string;

  constructor() {}

  setKey(key: string): this {
    this.key = key;

    return this;
  }

  setFlags(flags: number): this {
    this.flags = flags;

    return this;
  }

  setExpirationTime(exptime: number): this {
    let newTime = exptime;

    if (newTime > 0) {
      newTime = new Date().getTime() + newTime * 1000;
    }

    this.expirationTime = newTime;

    return this;
  }

  setBytes(bytes: number): this {
    this.bytes = bytes;

    return this;
  }

  setMessage(message: string): this {
    this.message = message;

    return this;
  }

  getKey() {
    return this.key;
  }

  getFlags() {
    return this.flags;
  }

  getExpirationTime() {
    return this.expirationTime;
  }

  getBytes() {
    return this.bytes;
  }

  getMessage() {
    return this.message;
  }
}
