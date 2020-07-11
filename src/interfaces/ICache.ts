export interface ICache {
  get(key: string): string | undefined;
  add(key: string, item: object): void;
  has(key: string): boolean;
  remove(key: string): void;
  update(key: string, item: object): void;
}
