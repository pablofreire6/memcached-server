import { IItem } from '../interfaces/IItem';

export class Item implements IItem {
  private key: string;
  private flags: number;
  private expirationTime: number;
  private bytes: number;
  private message: string;
  private casId: number;

  constructor() {}

  setKey(key: string): void {
    this.key = key;
  }

  setFlags(flags: number): void {
    this.flags = flags;
  }

  setExpirationTime(exptime: number): void {
    let newTime = exptime;

    if (newTime > 0) {
      newTime = new Date().getTime() + newTime * 1000;
    }

    this.expirationTime = newTime;
  }

  setBytes(bytes: number): void {
    this.bytes = bytes;
  }

  setMessage(message: string): void {
    this.message = message;
  }

  setCasId(casId: number) {
    this.casId = casId;
  }

  getKey(): string {
    return this.key;
  }

  getFlags(): number {
    return this.flags;
  }

  getExpirationTime(): number {
    return this.expirationTime;
  }

  getBytes(): number {
    return this.bytes;
  }

  getMessage(): string {
    return this.message;
  }

  getCasId() {
    return this.casId;
  }
}
