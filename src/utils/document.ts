import { isCNPJ } from './cnpj';
import { isCPF } from './cpf';
import { unmask } from './masks';

export const isDocumentValid = (document: string) => {
  const unmasked = unmask(document);

  if (unmasked.length === 14) {
    return isCNPJ(unmasked, true);
  }

  return isCPF(unmasked, true);
};
