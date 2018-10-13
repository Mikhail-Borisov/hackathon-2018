import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { NextFunction } from 'express';

@Middleware({ type: 'before' })
export class CorsMiddleware implements ExpressMiddlewareInterface {
    public use(_request: any, response: any, next: NextFunction ) {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader(
            'Access-Control-Allow-Headers',
            'Authorization, ' +
            'Content-Type, ' +
            'Cache-Control');
        response.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS');
        next();
    }
}
