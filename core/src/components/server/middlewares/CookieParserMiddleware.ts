import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { ExpressSessionWrapper, sessionWrapper } from '../session';

@Middleware({ type: 'before' })
export class CookieParserMiddleware implements ExpressMiddlewareInterface {
    private sessionWrapper: ExpressSessionWrapper = sessionWrapper;

    public use = (request: Request, response: Response, next: NextFunction): void => {
        this.sessionWrapper.cookieHandlerMiddleware(request, response, next);
    }

}