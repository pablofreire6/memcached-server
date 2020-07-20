export interface IMessage {
  parseGet(data: any, useCasId?: boolean): string;
  parseSet(data?: any): string;
}
