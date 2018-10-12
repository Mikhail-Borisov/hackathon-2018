import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { configLoader } from '../../configLoader';
import { ExpressSessionWrapper, SessionConfig } from '../session';

@Middleware({ type: 'before' })
export class SessionInitMiddleware implements ExpressMiddlewareInterface {
    private sessionWrapper: ExpressSessionWrapper = 
        new ExpressSessionWrapper(configLoader.getConfig('session') as SessionConfig);

    public use = (request: Request, response: Response, next: NextFunction): void => {
        this.sessionWrapper.sessionHandlerMiddleware(request, response, next);
    }

}