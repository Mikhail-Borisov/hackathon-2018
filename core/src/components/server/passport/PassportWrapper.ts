import * as passport from 'passport';
import * as Express from 'express';
import { PassportSerializer } from './PassportSerializer';

export class PassportWrapper {
    public initializerHandler: Express.Handler;
    public sessionHandler: Express.Handler;

    constructor() {
        this.initializerHandler = passport.initialize();
        this.sessionHandler = passport.session();
        this.setSerialization(passport);
    }

    public setSerialization(passport: passport.PassportStatic): void {
        passport.serializeUser(PassportSerializer.serialize);
        passport.deserializeUser(PassportSerializer.deserialize);
    }
}
