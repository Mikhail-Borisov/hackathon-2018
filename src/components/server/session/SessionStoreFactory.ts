import * as Session from 'express-session';
import * as RedisStoreFactory from 'connect-redis';

type RedisStoreConfig = {
    host: string;
    port: number;
};

enum StoreType {
    REDIS = 'redis',
    MEMORY = 'memory'
};

class SessionStoreFactory {
    public static instance() {
        return new SessionStoreFactory();
    }

    public create(type: StoreType, config: RedisStoreConfig | any): Session.Store | undefined | never {
        switch (type) {
            case StoreType.REDIS:
                    return this.createRedisStore(config);
            case StoreType.MEMORY:
                    return;
            default:
                throw new Error(`Invalid store type: ${type}`);
        }
    }

    private createRedisStore(config: RedisStoreConfig): Session.Store {
        const RedisStore = RedisStoreFactory(Session);
        return new RedisStore({
            host: config.host,
            port: config.port
        });
    }
}

export { SessionStoreFactory, StoreType };