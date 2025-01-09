import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import { User } from "@prisma/client";

export const CurrentUser = createParamDecorator(
    (data: keyof User, ctx: ExecutionContext) => {
        if (ctx.getType() === 'http') {
            const request = ctx.switchToHttp().getRequest();
            const user = request.user;
            return data ? user?.[data] : user;
        } else if (ctx.getType() === 'ws') {
            const client = ctx.switchToWs().getClient();
            const user = client.handshake?.user;
            return data ? user?.[data] : user;
        }
    },
);
