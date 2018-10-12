import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import { Logger } from '@interfaces';
import { OrmLogger } from './Logger';
import { DbConfig, DataBaseConfig } from './DbConfig';
import { ormLogger } from '../log';
import { configLoader } from '../configLoader';

export class DbConnectionFactory {
    private logger: Logger = ormLogger;
    private dbConfig: DbConfig = new DbConfig(configLoader.getConfig('db') as DataBaseConfig);

    public create(entitiesPaths: string[]): Promise<Connection> {
        return createConnection({
            ...this.getConfig(entitiesPaths),
            logger: new OrmLogger(this.logger)
        });
    }

    public getConfig(entitiesPaths: string[]): ConnectionOptions {
        return {
            ...this.dbConfig,
            entities: entitiesPaths,
            logging: true
        };
    }

}