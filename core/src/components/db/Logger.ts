import { Logger as IOrmLogger } from 'typeorm';
import { Logger } from '@interfaces';

class OrmLogger implements IOrmLogger {
    private logger_: Logger;

    constructor(logger: Logger) {
        this.logger_ = logger;
    }
    public logQuery(query: string, parameters?: any[]): any {
        let message = `${query};`;
        if (parameters) {
            message += ` Parameters: ${parameters}`;
        }
        this.logger_.info(message);
    }
    public logQueryError(error: string, query: string, parameters?: any[]): any {
        let message = `${error} ${query};`;
        if (parameters) {
            message += ` Parameters: ${parameters}`;
        }
        this.logger_.error(message);
    }
    public logQuerySlow(time: number, query: string, parameters?: any[]): any {
        let message = `${time} ${query};`;
        if (parameters) {
            message += ` Parameters: ${parameters}`;
        }
        this.logger_.verbose(message);
    }
    public logSchemaBuild(message: string): any {
        this.logger_.debug(message);
    }
    public logMigration(message: string): any {
        this.logger_.verbose(message);
    }
    public log(level: 'log' | 'info' | 'warn', message: any): any {
        (this.logger_ as any)[level](message);
    }
}

export { OrmLogger };