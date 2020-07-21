import { IItem } from './IItem';

export interface ICache {
  get(key: string): IItem | undefined;
  add(key: string, item: IItem): void;
  has(key: string): boolean;
  remove(key: string): void;
  update(key: string, item: object): void;
  clearExpired(): void;
}
