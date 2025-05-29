import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.locale('pt-br');
dayjs.extend(customParseFormat);

export const customDayJs = dayjs;
