import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { ExpressSessionWrapper, sessionWrapper } from '../session';

@Middleware({ type: 'before' })
export class SessionInitMiddleware implements ExpressMiddlewareInterface {
    private sessionWrapper: ExpressSessionWrapper = sessionWrapper;

    public use = (request: Request, response: Response, next: NextFunction): void => {
        this.sessionWrapper.sessionHandlerMiddleware(request, response, next);
    }

}