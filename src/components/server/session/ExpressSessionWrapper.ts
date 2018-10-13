import * as Session from 'express-session'; 
import * as Express from 'express';

import { SessionExtractor } from './SessionExtractor';
import { SessionSignature } from './SessionSignature';
import { SessionIdGenerator } from './SessionIdGenerator';
import { SessionStoreFactory, StoreType } from './SessionStoreFactory';

type SessionConfig = {
    secret: string;
    name: string;
    source: string;
    paramName: string;
    store: {
        type: StoreType,
        host: string;
        port: number;
    };
};

class ExpressSessionWrapper {
    private sessionHandler!: Express.RequestHandler;
    private idGenerator: SessionIdGenerator;;
    private config: SessionConfig;

    constructor(config: SessionConfig) {
        this.config = config;
        const extractor = new SessionExtractor(config.paramName, config.source);
        const signature = new SessionSignature(config.secret);

        const store = SessionStoreFactory.instance().create(config.store.type, config.store);
        this.idGenerator = new SessionIdGenerator(extractor, signature);
        this.initSessionHandler(store);
    }

    public get sessionHandlerMiddleware(): Express.RequestHandler {
        return this.sessionHandler;
    }

    public get cookieHandlerMiddleware(): Express.RequestHandler {
        return this.setCookie.bind(this);
    }

    private setCookie(request: Express.Request, _response: Express.Response, next: Express.NextFunction): void {
        const session = this.idGenerator.extractor.extractSession(request);
        if (session) {
            const signedSession = this.idGenerator.signature.signSession(session);
            request.headers.cookie = this.idGenerator.signature.serialize(this.config.name, signedSession);
        }
        next();
    }

    private initSessionHandler(store: Session.Store | undefined): void {
        this.sessionHandler = Session({
            name: this.config.name,
            secret: this.config.secret,
            resave: false,
            saveUninitialized: true,
            store,
            cookie: {
                httpOnly: false,
                maxAge: 604800000,
                secure: false
            },
            genid: this.idGenerator.getGeneratorFunction() as { (req: Express.Request): string; }
        });
    }
}   

export { ExpressSessionWrapper, SessionConfig };