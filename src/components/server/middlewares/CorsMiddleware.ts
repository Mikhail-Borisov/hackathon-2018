import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { NextFunction } from 'express';

@Middleware({ type: 'before' })
export class CorsMiddleware implements ExpressMiddlewareInterface {
    public use(_request: any, response: any, next: NextFunction) {
        response.set({
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Credentials': 'true'
        });
        next();
    }
}
