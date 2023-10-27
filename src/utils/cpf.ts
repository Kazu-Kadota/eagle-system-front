import { unmask } from './masks';

const BLACKLIST = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
  '12345678909',
];

const verifierDigit = (digits: string) => {
  const numbers = digits.split('').map(Number);
  const modulus = numbers.length + 1;
  const multiplied = numbers.map((number, index) => number * (modulus - index));
  const mod = multiplied.reduce((buffer, number) => buffer + number) % 11;

  return mod < 2 ? 0 : 11 - mod;
};

export const isCPF = (number: string, isUnmasked?: boolean) => {
  const unmasked = !isUnmasked ? unmask(number) : number;

  if (!unmasked) {
    return false;
  }

  if (unmasked.length !== 11) {
    return false;
  }

  if (BLACKLIST.includes(unmasked)) {
    return false;
  }

  let numbers = unmasked.slice(0, 9);
  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return numbers.slice(-2) === unmasked.slice(-2);
};
