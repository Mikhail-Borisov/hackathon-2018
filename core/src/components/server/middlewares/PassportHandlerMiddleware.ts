import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { passportWrapper, PassportWrapper } from '../passport';

@Middleware({ type: 'before' })
export class PassportHandlerMiddleware implements ExpressMiddlewareInterface {
    private passportWrapper: PassportWrapper = passportWrapper;

    public use = (request: Request, response: Response, next: NextFunction): void => {
        this.passportWrapper.sessionHandler(request, response, next);
    }
}