import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

// significa que no requerirá autenticación para acceder.
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
