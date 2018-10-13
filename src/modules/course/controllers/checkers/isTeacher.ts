import { ForbiddenError } from 'routing-controllers';
import { UserRole } from '../../../user/models/User';

export function isTeacher(
    request: Express.Request,
    _response: Express.Response,
    next: (err?: any) => any
): any | never {
    if (!request.user || (request.user.role !== UserRole.TEACHER)) {
        throw new ForbiddenError('Access restricted');
    }
    next();
}