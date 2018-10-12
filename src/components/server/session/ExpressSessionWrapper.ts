import * as Session from 'express-session'; 
import * as Express from 'express';
import { SessionStoreFactory, StoreType } from './SessionStoreFactory';

type SessionConfig = {
    secret: string;
    name: string;
    store: {
        type: StoreType,
        host: string;
        port: number;
    }
};

class ExpressSessionWrapper {
    private sessionHandler!: Express.RequestHandler;

    constructor(config: SessionConfig) {
        const store = SessionStoreFactory.instance().create(config.store.type, config.store);
        this.initSessionHandler(config.name, config.secret, store);
    }

    public get sessionHandlerMiddleware(): Express.RequestHandler {
        return this.sessionHandler;
    }

    private initSessionHandler(name: string, secret: string, store: Session.Store | undefined): void {
        this.sessionHandler = Session({
            name,
            secret,
            store,
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 36000000
            }
        });
    }
}   

export { ExpressSessionWrapper, SessionConfig };