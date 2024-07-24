import { SetMetadata } from "@nestjs/common";
import { Rol } from "src/guards/role/roles.enum";

export const Roles = (... roles :Rol[] )=> SetMetadata('roles', roles)