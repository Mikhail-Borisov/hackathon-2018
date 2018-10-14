import { AccessLogMiddlware } from './AccessLogMiddlware';
import { ErrorLogMiddleware } from './ErrorLogMiddleware';
import { BodyParserMiddleware } from './BodyParserMiddleware';
import { CorsMiddleware } from './CorsMiddleware';
import { SessionInitMiddleware } from './SessionMiddleware';
import { CacheControllMiddleware } from './CacheControllMiddleware';
import { ErrorHandlingMiddleware } from './ErrorHandlingMiddleware';
import { PassportHandlerMiddleware } from './PassportHandlerMiddleware';
import { PassportInitializeMiddleware } from './PassportInitMiddleware';
import { CookieParserMiddleware } from './CookieParserMiddleware';

export const middlewares = [
    AccessLogMiddlware,
    ErrorLogMiddleware,
    BodyParserMiddleware,
    CorsMiddleware,
    CacheControllMiddleware,
    CookieParserMiddleware,
    SessionInitMiddleware,
    PassportInitializeMiddleware,
    PassportHandlerMiddleware,
    ErrorHandlingMiddleware
];