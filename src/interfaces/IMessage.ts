export interface IMessage {
  parseGet(data: any): string;
  parseSet(data: string): string;
}
