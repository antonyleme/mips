import uintToInt from './uintToInt';

export const parseRs = (binaryString) => {
  return parseInt(binaryString.substring(6, 11), 2);
};

export const parseRt = (binaryString) => {
  return parseInt(binaryString.substring(11, 16), 2);
};

export const parseRd = (binaryString) => {
  return parseInt(binaryString.substring(16, 21), 2);
};

export const parseOffset = (binaryString) => {
  return parseInt(binaryString.substring(16, 32), 2);
};

export const parseImmediate = (binaryString) => {
  return uintToInt(parseInt(binaryString.substring(16, 32), 2), 10);
};

export const parseAddress = (binaryString) => {
  return parseInt(binaryString.substring(6, 32), 2);
};
