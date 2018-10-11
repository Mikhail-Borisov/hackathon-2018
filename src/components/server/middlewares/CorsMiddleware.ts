import * as cors from 'cors';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';

@Middleware({ type: 'before' })
export class CorsMiddleware implements ExpressMiddlewareInterface {
    public use = cors();
}