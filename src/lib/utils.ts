export function cleanText(text: string) {
  return text.replace(/[\r\n]/g, '');
}

export function uniqueId() {
  var i = new Date().getTime();
  i = i & 0xffffffff;

  return i;
}
