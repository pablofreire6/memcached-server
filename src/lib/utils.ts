export function cleanText(text: string) {
  return text.replace(/[\r\n]/g, '');
}

export function encodeMessage(message: string) {
  let buff = Buffer.from(message);
  return buff.toString('base64');
}
