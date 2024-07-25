import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuards implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiresAdmin = this.reflector.getAllAndOverride<boolean>('isAdmin', [context.getHandler(), context.getClass()]);

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const isAdmin = user && user.isAdmin;
        const valid = isAdmin && requiresAdmin;
        if (!valid) {
            throw new ForbiddenException('You do not have permissions to access this information');
        }

        return valid;
    }
}
