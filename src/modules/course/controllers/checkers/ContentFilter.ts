import { InterceptorInterface, Action } from 'routing-controllers';
import { Course } from 'modules/course/models/Course';
import { UserRole } from '../../../user/models/User';

export class ContentFilter implements InterceptorInterface {
    intercept(action: Action, result: { list: Course[]; }) {
        if (!action.request.user || (action.request.user.role != UserRole.TEACHER)) {
            result = {
                list: result.list.filter(course => course.isPublished)
            };
        }
        return result;
    }
}