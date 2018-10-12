import { AccessLogMiddlware } from './AccessLogMiddlware';
import { ErrorLogMiddleware } from './ErrorLogMiddleware';
import { BodyParserMiddleware } from './BodyParserMiddleware';
import { CorsMiddleware } from './CorsMiddleware';
import { SessionInitMiddleware } from './SessionMiddleware';
import { CacheControllMiddleware } from './CacheControllMiddleware';
import { ErrorHandlingMiddleware } from './ErrorHandlingMiddleware';
import { PassportHandlerMiddleware } from './PassportHandlerMiddleware';
import { PassportInitializeMiddleware } from './PassportInitMiddleware';

export const middlewares = [
    AccessLogMiddlware,
    ErrorLogMiddleware,
    BodyParserMiddleware,
    CorsMiddleware,
    CacheControllMiddleware,
    SessionInitMiddleware,
    PassportInitializeMiddleware,
    PassportHandlerMiddleware,
    ErrorHandlingMiddleware
];