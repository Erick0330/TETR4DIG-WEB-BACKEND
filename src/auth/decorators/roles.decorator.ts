import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (rol) => SetMetadata(ROLES_KEY, rol);