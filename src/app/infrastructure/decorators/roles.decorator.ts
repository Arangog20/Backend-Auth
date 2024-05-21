import { SetMetadata } from '@nestjs/common';

// Define un decorador llamado Roles que asigna metadatos de roles
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
    