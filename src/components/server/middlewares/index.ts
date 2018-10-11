import { AccessLogMiddlware } from './AccessLogMiddlware';
import { ErrorLogMiddleware } from './ErrorLogMiddleware';
import { BodyParserMiddleware } from './BodyParserMiddleware';
import { CorsMiddleware } from './CorsMiddleware';

export const middlewares = [
    AccessLogMiddlware,
    ErrorLogMiddleware,
    BodyParserMiddleware,
    CorsMiddleware
];