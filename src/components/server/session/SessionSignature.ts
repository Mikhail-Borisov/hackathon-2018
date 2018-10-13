import * as cookieSignature from 'cookie-signature';
import * as cookie from 'cookie';

export class SessionSignature {
    public static COOKIE_PREFIX: string = 's:';

    private cookiePrefix: string;
    private secret: string;

    constructor(secret: string, cookiePrefix?: string) {
        this.cookiePrefix = cookiePrefix ? cookiePrefix : SessionSignature.COOKIE_PREFIX;
        this.secret = secret;
    }

    public serialize(name: string, session: string): string {
        return cookie.serialize(name, session);
    }

    public signSession(sessionId: string): string {
        const session =
            this.cookiePrefix + cookieSignature.sign(sessionId, this.secret);
        return session;
    }
    public unsignSession(signedSession: string): string | undefined {
        const cookie = this.removePrefix(decodeURIComponent(signedSession));
        const unsigned = cookieSignature.unsign(cookie, this.secret) as string;
        return unsigned ? unsigned : undefined;
    }
    private removePrefix(signedSession: string): string {
        const hasPrefix = signedSession.indexOf(this.cookiePrefix) == 0;
        return hasPrefix ?
            signedSession.substring(this.cookiePrefix.length) :
            signedSession;
    }
}