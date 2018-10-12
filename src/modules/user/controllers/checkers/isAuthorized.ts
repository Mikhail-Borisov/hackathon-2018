import { ForbiddenError } from 'routing-controllers';

export function isAuthorized(
    request: Express.Request,
    _response: Express.Response,
    next: (err?: any) => any
): any | never {
    if (!Boolean(request.user && request.user.id)) {
        throw new ForbiddenError('Unauthorized user');
    }
    next();
}