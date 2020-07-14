export interface IItem {
  getKey(): string;
  getFlags(): number;
  getExpirationTime(): number;
  getBytes(): number;
  getMessage(): string;
  setKey(key: string): IItem;
  setFlags(flags: number): IItem;
  setExpirationTime(exptime: number): IItem;
  setBytes(bytes: number): IItem;
  setMessage(message: string): IItem;
}
