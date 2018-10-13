import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import * as cors from 'cors';

@Middleware({ type: 'before' })
export class CorsMiddleware implements ExpressMiddlewareInterface {
    public use = cors();
}
