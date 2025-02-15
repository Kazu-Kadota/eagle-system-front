import dayjs from 'dayjs';
import { type JWT } from 'next-auth/jwt';

export const isAuthenticated = (jwt?: JWT['jwt']) =>
  !!(jwt?.token && jwt.expiresIn) && dayjs().isBefore(dayjs(jwt.expiresIn));
