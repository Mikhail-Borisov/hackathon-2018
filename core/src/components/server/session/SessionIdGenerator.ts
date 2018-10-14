import * as Express from 'express';
import {sync as uid} from 'uid-safe';
import { SessionExtractor } from './SessionExtractor';
import { SessionSignature } from './SessionSignature';

export class SessionIdGenerator {
    public extractor: SessionExtractor;
    public signature: SessionSignature;

    constructor(extractor: SessionExtractor, signature: SessionSignature) {
        this.extractor = extractor;
        this.signature = signature;
    }

    public getGeneratorFunction(): Function {
        return this.generate.bind(this);
    }

    public generate(request: Express.Request): string {
        let sid: string | undefined;
        const passed = this.extractor.extractSession(request);
        if (passed) {
            const unsigned =
                this.signature.unsignSession(passed);
            if (unsigned) {
                sid = unsigned;
            }
        }
        return sid || uid(24);
    }
}
