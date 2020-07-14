export interface IMessage {
  parseGet(data: any): string;
  parseSet(data?: any): string;
}
