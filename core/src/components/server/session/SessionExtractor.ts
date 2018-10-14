import * as Express from 'express';
import { BadRequestError } from 'routing-controllers';

export class SessionExtractor {
    private defaultSessionStore = {
        query: 'query',
        header: 'header'
    };

    private sessionSource: string;
    private sourceParamName: string;

    constructor(paramName: string, source?: string) {
        if (source) {
            this.sessionSource = source;
        } else {
            this.sessionSource = this.defaultSessionStore.query;
        }
        this.sourceParamName = paramName;

        if (this.sessionSource != this.defaultSessionStore.query &&
            this.sessionSource != this.defaultSessionStore.header) {
            throw new BadRequestError(`sessionSource must be ${this.defaultSessionStore.query} ` +
                `or ${this.defaultSessionStore.header}`);
        }
    }

    public extractSession(request: Express.Request): string | undefined {
          return this.sessionSource == this.defaultSessionStore.query ?
              this.extractFromQuery(request) :
              this.extractFromHeader(request);
    }

    private extractFromHeader(request: Express.Request): string | undefined {
        return request.get(this.sourceParamName);
    }

    private extractFromQuery(request: Express.Request): string | undefined {
        return request.query[this.sourceParamName];
    }

}

