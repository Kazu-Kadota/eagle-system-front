export const unmask = (value: string) => value.replace(/\D/g, '');

export const maskDate = (value: string) =>
  unmask(value)
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})\d/, '$1');

export const maskCpf = (value: string, blockLength = true) => {
  const masked = unmask(value)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2');

  if (blockLength) {
    return masked.replace(/(-\d{2})\d+?$/, '$1');
  }

  return masked;
};

export const maskCnpj = (value: string) =>
  unmask(value)
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');

export const maskCpfOrCnpj = (value: string) => {
  const unmasked = unmask(value);

  if (unmasked.length <= 11) {
    return maskCpf(unmasked, false);
  }

  return maskCnpj(unmasked);
};

export const maskPlate = (value: string) =>
  value.toUpperCase().replace(/([A-Z0-9]{7})[A-Z0-9]+?$/, '$1');
