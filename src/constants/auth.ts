import { CompanyType, UserType } from 'src/models';
import type { SelectItem } from 'src/types/select';

export const registerUserTypeSelectItems: SelectItem<UserType>[] = [
  { label: 'Administrador', value: UserType.ADMIN },
  { label: 'Operador', value: UserType.OPERATOR },
  { label: 'Cliente', value: UserType.CLIENT },
];

export const userApiSelectItems: SelectItem[] = [
  { label: 'Sim', value: 'true' },
  { label: 'Não', value: 'false' },
];

export const companyTypeSelectItems: SelectItem<CompanyType>[] = [
  { label: 'Cliente', value: CompanyType.CLIENT },
  { label: 'Fonte', value: CompanyType.FONT },
];
