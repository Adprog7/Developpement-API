import { SetMetadata } from '@nestjs/common';
import type { Role } from '../../users/enums/role.enum.ts'; // Assure-toi que cet enum existe

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);