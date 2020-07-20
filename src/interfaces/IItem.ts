export interface IItem {
  getKey(): string;
  getFlags(): number;
  getExpirationTime(): number;
  getBytes(): number;
  getMessage(): string;
  getCasId(): number;
  setKey(key: string): void;
  setFlags(flags: number): void;
  setExpirationTime(exptime: number): void;
  setBytes(bytes: number): void;
  setMessage(message: string): void;
  setCasId(casId: number): void;
}
