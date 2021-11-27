// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const randomColor = (brightness: number): string =>
  '#' +
  randomChannel(brightness) +
  randomChannel(brightness) +
  randomChannel(brightness);

export const randomChannel = (brightness: number): string => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const r = 255 - brightness;
  const n = 0 | (Math.random() * r + brightness);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const s = n.toString(16);
  return s.length === 1 ? '0' + s : s;
};
