import { unmask } from './masks';

const BLACKLIST = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999',
];

const verifierDigit = (digits: string): number => {
  let index = 2;
  const reverse = digits
    .split('')
    .reduce(
      (buffer: number[], number: string) => [Number(number)].concat(buffer),
      [],
    );

  const sum = reverse.reduce((buffer, number) => {
    buffer += number * index;
    index = index === 9 ? 2 : index + 1;
    return buffer;
  }, 0);

  const mod = sum % 11;
  return mod < 2 ? 0 : 11 - mod;
};

export const isCNPJ = (number: string, isUnmasked?: boolean) => {
  const unmasked = !isUnmasked ? unmask(number) : number;

  if (!unmasked) {
    return false;
  }

  if (unmasked.length !== 14) {
    return false;
  }

  if (BLACKLIST.includes(unmasked)) {
    return false;
  }

  let numbers = unmasked.slice(0, 12);
  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return numbers.slice(-2) === unmasked.slice(-2);
};
